/* ESCROWBITCOIN.NET WEB SERVICE
(c) fbslo, 2019
*/

/*
CHANGE VARIABLES
*/

var email_address = 'fbslo.developer@fbslo.net' //Your personal email (used for email from 'contact form on website')
var email_password = 'password' //your email password

var database_ip = '1.1.1.1' //IP address of your database (if not on save server) or localhost (if on same server)
var database_password = 'password' //database password
var database_user = 'root' //database user
var database_port = 3306 //database port (do not change if it't working)

var support_email = 'suport@escrowbitcoin.net' //contact email for any problems with webapp

var port_http = 80 //port for http
var port_https = 443 //port for https

/*
OVER
*/

var express =  require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var nodemailer = require('nodemailer');
const Swal = require("sweetalert2");
var WAValidator = require('wallet-address-validator');
var validator = require("email-validator");
const email_config = require('./config');
const crypto = require("crypto");
var QRCode = require('qrcode');
var base64Img = require('base64-img');
const https = require('https');
const fs = require('fs');
var balance = require('crypto-balances');
var multer = require('multer');
var request = require('request');

//const export_complete_transaction = require("./completeTransaction")

//get Date & time
var currentdate = new Date();
var datetime =  ('0' + currentdate.getDate()).slice(-2) + "/"
                +  ('0'+(currentdate.getMonth()+1)).slice(-2)  + "/"
                + currentdate.getFullYear() + " / "
                + ('0' + currentdate.getHours()).slice(-2) + ":"
                + ('0' + currentdate.getMinutes()).slice(-2) + ":"
                + ('0' + currentdate.getSeconds()).slice(-2);


//secret generator function
function generateHexString(length) {
  var ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0,length);
}

//create connection to MySQL database
var con = mysql.createConnection({
  host: database_ip,
  database: 'escrow',
  user: database_user,
  password: database_password,
  port: database_port
});
//connect to MySQL database
con.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as ID: ' + con.threadId);
});

//create nodemailer transporter
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email_address,
    pass: email_password
  },
  tls: {
        rejectUnauthorized: false
    }
});

//create express connection and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('dest'));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
//app.use(multer()); // for parsing multipart/form-data

console.log("Starting Web app...")

//login page for existing transactions
app.get('/transaction', (req, res) => {
  var html = "<head><title>EscrowBitcoin.net</title>";
  html += "<link rel='stylesheet' href='css/tx.css'></head><body>";
  html += "<div class='wrapper fadeInDown'>";
  html += "<div id='formContent'>";
  html += "<h2>Transaction</h2>";
  html += "<form action='/transaction-view' method='POST' name='form1'>";
  html += "<input type='text' id='tx' class='fadeIn second' name='login' placeholder='Transaction ID' required='required'>";
  html += "<input type='password' id='secret' class='fadeIn third' name='secret' placeholder='Secret' required='required'><p>";
  html += "<input type='submit' class='fadeIn fourth' value='View Transaction'><br><a class='underlineHover' href='/transaction-new'>Create New Transaction</a>";
  html += "</form>";
  html += "<div id='formFooter'>";
  html += "<a class='underlineHover' href='/'>EscrowBitcoin.net</a>";
  html += "</div>";
  html += "</div>";
  html += "</div>";
  res.send(html);
});

//website status
app.get('/status', (req, res) => {
  con.query("SELECT SUM(amount) AS totalTransactionAmount FROM escrow WHERE status ='COMPLETED' OR status ='PENDING';", function (err, result, fields) {
    try{
      if (err) throw err;
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      if (json[0] === undefined){
        //buyer secret is not in the database
        console.log("Not in the database!")
      }
      else{
        console.log(result[0].totalTransactionAmount)
        var totalTransactionAmount = parseFloat(result[0].totalTransactionAmount.toFixed(8))
        con.query("SELECT SUM(amount) AS not_completed FROM escrow WHERE status ='PAID';", function (err_1, result_1, fields_1) {
          if (err) throw err;
          var string_1 = JSON.stringify(result_1);
          var json_1 = JSON.parse(string_1);
          if (json_1[0] === undefined){
            //buyer secret is not in the database
            console.log("Not is the database!")
          }
          else{
            console.log(result_1[0].not_completed)
            var not_completed = parseFloat(result_1[0].not_completed.toFixed(8))
            //send json to client
            con.query("SELECT * FROM escrow;", function (err_2, result_2, fields_2) {
              console.log(result_2.length)
              var length = result_2.length + 17
              res.json({escrow_online: true, transaction: length, btc_escrow_active: not_completed, btc_escrow_completed: totalTransactionAmount})
            });
          }
        });
      }
    }
    catch (err){
      console.log("ERROR with status: " + err)
      res.send("INTERNAL SERVER ERROR, PLEASE CONTACT SUPPORT! ERROR CODE: " + err + "<br>REDIRECTING YOU BACK...  <script>setTimeout(function () {window.location = '/';}, 5000)</script>")
    }
  });
});



//send email from contact form
app.get('/send-email', (req, res) => {
  try{
    var ip = req.body.ip
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var valid_email = validator.validate(email)
    if (name == undefined || name == '' || email == undefined || email == '' || !valid_email || message == undefined ||  message == ''){
      console.log("Email was not sent")
      res.send('Error! Email was not sent! Redirecting you back... <script>setTimeout(function () {window.location = "/";}, 2000)</script>');
    }
    else{

      var mailOptions = {
        from: 'fbslo.developer@fbslo.net',
        to: 'fbslo.developer@fbslo.net',
        subject: 'EscrowBitcoin.net - Contact Form - New Message',
        text: "New Message from contact form at EscrowBitcoin.net! Name: " + name + ", Email: " + email + ", Message: " + message + ", Time: " + datetime + "!"
      };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          console.log('EMAIL FROM FORM ERROR '+ error);
          res.send('ERROR TRY AGAIN LATER');
          } else {
          console.log('Email from form sent: ' + info.response);
          res.send('Success! Email was sent! Redirecting you back... <script>setTimeout(function () {window.location = "/";}, 2000)</script>');
          }
      });
    }
  }
  catch (err){
    console.log("ERROR sending email from form. "+ err)
    res.send("INTERNAL SERVER ERROR, PLEASE CONTACT SUPPORT! ERROR CODE: " + err + "<br>REDIRECTING YOU BACK...  <script>setTimeout(function () {window.location = '/';}, 5000)</script>")
  }
});

//complete the transaction, when buyer clicks the link
app.post('/complete-transaction', (req, res) => {
  //variables from AJAX request by buyer
  console.log("Seller's address: "+req.body.seller_address)
  console.log("Buyer's secret: "+req.body.buyer_secret)
  console.log("Deposit address: "+req.body.deposit_address)
  console.log("Amount: "+req.body.amount)
  //get details from the database, to verify secret
  con.query("SELECT * FROM escrow WHERE buyer_secret = '"+req.body.buyer_secret+"';", function (err, result, fields) {
    try {
      if (err) throw err;
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      if (json[0] === undefined){
        //buyer secret is not in the database
        console.log("Wrong buyer secret!")
      }
      else {
        //buyer's secret is in the database update escrow status is the database
        var change_status_address = "UPDATE escrow SET status = 'PENDING' WHERE buyer_secret = '"+req.body.buyer_secret+"';";
        con.query(change_status_address,  function (err, result_1) {
          if (err) throw err;
          if(result){
            console.log("Escrow Status status changed to PENDING!")
          }
        }); //UPDATE con.query
      } //else
    }
    catch (err){
      console.log("error, tx not completed")
    }
  }); //first con.query
}) //app.post


//start the dispute by inserting tx into dispute database table
app.post('/dispute', (req, res) => {
  //variables from AJAX request by buyer
  console.log("Seller's address: "+req.body.seller_address)
  console.log("Buyer's secret: "+req.body.buyer_secret)
  console.log("Deposit address: "+req.body.deposit_address)
  console.log("Amount: "+req.body.amount)
  //get details from the database, to verify secret
  con.query("SELECT * FROM escrow WHERE buyer_secret = '"+req.body.buyer_secret+"';", function (err, result, fields) {
    if (err) throw err;
    var string = JSON.stringify(result);
    var json = JSON.parse(string);
    if (json[0] === undefined){
      //buyer secret is not in the database
      console.log("Wrong buyer secret!")
    }
    else {
      //variables for inserting
      var buyer_id = result[0].buyer_id
      var seller_id = result[0].seller_id
      var amount = result[0].amount
      var date = result[0].date
      var dispute_date = datetime
      var deposit_address = result[0].deposit_address
      var details = result[0].details
      //instert disputed transaction
      var change_status_address = "INSERT INTO dispute (buyer_id, seller_id, amount, date, dispute_date, deposit_address, details) VALUES('"+buyer_id+"', '"+seller_id+"', '"+amount+"', '"+date+"', '"+dispute_date+"', '"+deposit_address+"', '"+details+"');"
      con.query(change_status_address,  function (err, result_1) {
        try{
          if (err) throw err;
          if(result_1){
            console.log("Escrow Status status changed to PENDING!")
            //change status in escrow table
            var change_status_address = "UPDATE escrow SET status = 'DISPUTE' WHERE buyer_id = '"+buyer_id+"' AND seller_id = '"+seller_id+"';"
            con.query(change_status_address,  function (err, result_2) {
              if (err) throw err;
              try{
                console.log("Escrow table changed, status set to DISPUTE!")
              }
              catch (err) {
                console.log("ERROR Escrow table NOT changed, status NOT set to DISPUTE!")
              }
            });
          }
        }
        catch (err){
          console.log("ERROR insering into dispute!")
        }
      }); //UPDATE con.query
    } //else
  }); //first con.query
}) //app.post

//details of transaction
app.post('/transaction-view', (req, res) => {
  //get data from form online
  var login_online = req.body.login
  var secret_online = req.body.secret
  try{
    //get data from the database
     con.query("SELECT * FROM escrow WHERE seller_id = '"+login_online+"' OR buyer_id = '"+login_online+"';", function (err, result, fields) {
       try {
         if (err) throw err;
         var string= JSON.stringify(result);
         var json = JSON.parse(string);
         if(json[0] ===  undefined){
           console.log("Error, not is database")
           error()
         }
         else{
           //get variables from database
           console.log(result);
           var login_buyer = result[0].buyer_id
           var secret_buyer = result[0].buyer_secret
           var login_seller = result[0].seller_id
           var secret_seller = result[0].seller_secret
           var amount = result[0].amount
           var seller_email = result[0].seller_email
           var seller_address = result[0].seller_address
           var buyer_email = result[0].buyer_email
           var details = result[0].details
           var status = result[0].status
           var date_escrow = result[0].date
           var address_deposit = result[0].deposit_address
           var image_qr_code = result[0].qr_image
           var image_qr_code_script = image_qr_code.substring(1)
           var fee = parseFloat((amount * 0.05).toFixed(8))
           var amount_and_fee = fee + amount

           //login for buyer
           if(login_online == login_buyer){
             if(secret_online == secret_buyer){
               var user_status = 'buyer'
               var secret1 = secret_buyer.substring(0,3) //first 3 letters of secret
               var secret2 = secret_buyer.substring(23, 26) //last 3 letters of secret
               var closed = '*'.repeat(20) //20 * signs

               //alert with qr Code
               var complete = "<script>";
               complete += "function show() {";
               complete += "Swal.fire({imageUrl: '/"+image_qr_code_script+"', imageHeight: 250, imageWidth: 250, imageAlt: 'QR Code'})";
               complete += "}</script>";
               if (status == 'PAID'){
                 var escrow_status_icon = '<i class="fa  fa-check-circle-o" aria-hidden="true" style="color:green"></i>'

                 //hide POST request to complete transaction
                 var jquery =  "$.ajax('/complete-transaction', {"
                 jquery +=   " type: 'POST',"
                 jquery += "data: {"
                 jquery +=     " buyer_secret: '"+secret_buyer+"',"
                 jquery +=     " seller_address: '"+seller_address+"',"
                 jquery +=     " deposit_address: '"+address_deposit+"',"
                 jquery +=     " amount: '"+amount+"'"
                 jquery +=   " }"
                 jquery +=  "})"
                 //start dispute AJAX
                 var dispute =  "$.ajax('/dispute', {"
                 dispute +=   " type: 'POST',"
                 dispute += "data: {"
                 dispute +=     " buyer_secret: '"+secret_buyer+"',"
                 dispute +=     " seller_address: '"+seller_address+"',"
                 dispute +=     " deposit_address: '"+address_deposit+"',"
                 dispute +=     " amount: '"+amount+"'"
                 dispute +=   " }"
                 dispute +=  "})"
                 //complete the transaction
                 var js_code = "function completeTransaction() {"
                 js_code += "Swal.fire('Do you want complete the transaction?').then((button) => {if(button){"
                 js_code += ""+jquery+""
                 js_code += "} window.location.reload();});};"
                 //start dispute
                 js_code += "function startDispute() {"
                 js_code += "Swal.fire('Do you want to start dispute?').then((button) => {if(button){"
                 js_code += ""+dispute+""
                 js_code += "} window.location.reload();});};"


                 var post = "<script>"
                 post += js_code
                 post += "</script>"
               }
               if (status == 'PENDING'){
                 var escrow_status_icon = '<i class="fa  fa-check-circle-o" aria-hidden="true" style="color:yellow"></i>'

                 //on click on complete transaction, transaction is not paid yet
                 var js_code = "function completeTransaction() {"
                 js_code += "Swal.fire({type: 'error', title: 'You can&#39;t complete transaction!', html: 'You already completed the transaction.<br>If you need help, contact the support: support@escrowbitcoin.net'})"
                 js_code += "}"
                 //start dispute
                 js_code += "function startDispute() {";
                 js_code += "Swal.fire({type: 'error', title: 'You can&#39;t start dispute!', html: 'You already completed the transaction.<br>If you need help, contact the support: support@escrowbitcoin.net'})"
                 js_code += "}";

                 var post = "<script>"
                 post += js_code
                 post += "</script>"

               }
               if (status == 'COMPLETED'){
                 var escrow_status_icon = '<i class="fa  fa-check-circle-o" aria-hidden="true" style="color:green"></i>'
                 //on click on complete transaction, transaction was already COMPLETED
                 var js_code = "function completeTransaction() {"
                 js_code += "Swal.fire({type: 'error', title: 'You can&#39;t complete transaction!', html: 'Transaction was already completed!<br>If you need help, contact the support: support@escrowbitcoin.net'})"
                 js_code += "}"
                 //start dispute
                 js_code += "function startDispute() {";
                 js_code += "Swal.fire({type: 'error', title: 'You can&#39;t start dispute!', html: 'Transaction was already completed!<br>If you need help, contact the support: support@escrowbitcoin.net'})"
                 js_code += "}";

                 var post = "<script>"
                 post += js_code
                 post += "</script>"

               }
               if (status == 'DISPUTE'){
                 var escrow_status_icon = '<i class="fa  fa-times-circle" aria-hidden="true" style="color:red"></i>' //fa-check-circle-o
                 //on click on complete transaction, transaction was already COMPLETED
                 var js_code = "function completeTransaction() {"
                 js_code += "Swal.fire({type: 'error', title: 'You can&#39;t complete transaction!', html: 'Transaction is in dispute!'})"
                 js_code += "}"
                 //start dispute
                 js_code += "function startDispute() {";
                 js_code += "Swal.fire({type: 'error', title: 'You can&#39;t start dispute!', html: 'Transaction is already in dispute!'})"
                 js_code += "}";

                 var post = "<script>"
                 post += js_code
                 post += "</script>"

               }
               if(status == 'UNPAID'){
                 //show if amount is UNPAID
                 var deposit_address = "	  <tr>";
                 deposit_address += "		 <td></td>";
                 deposit_address += "		 <td></td>";
                 deposit_address += "		 <td>Deposit Address</td>";
                 deposit_address += "		 <td></td>";
                 deposit_address += "<td>"+address_deposit+" <span onclick='show()'><i class='fas fa-qrcode'></i></span></td>";
                 deposit_address += "	  </tr>";

                 var escrow_status_icon = '<i class="fa  fa-times-circle" aria-hidden="true" style="color:red"></i>' //fa-check-circle-o

                 //on click on complete transaction, transaction is not paid yet
                 var js_code = "function completeTransaction() {"
                 js_code += "Swal.fire({type: 'error', title: 'You can&#39;t complete transaction!', html: 'Please deposit Bitcoins first!'})"
                 js_code += "}"
                 //start dispute
                 js_code += "function startDispute() {";
                 js_code += "Swal.fire({type: 'error', title: 'You can&#39;t start dispute!', html: 'Please deposit Bitcoins first!'})"
                 js_code += "}";

                 var post = "<script>"
                 post += js_code
                 post += "</script>"

               }

               else{
                 var deposit_address = ''
               }
               dashboard(user_status, login_buyer, secret1, closed, secret2, amount, seller_email, seller_address, buyer_email, details, status, date_escrow, complete, deposit_address, escrow_status_icon); //show dashboard
             }
             else{
               error()
             }
           }
           //login for seller
           if(login_online == login_seller){
             if(secret_online == secret_seller){
               var user_status = 'seller'
               var secret1 = secret_seller.substring(0,3) //first 3 letters of secret
               var secret2 = secret_seller.substring(23, 26) //last 3 letters of secret
               var closed = '*'.repeat(20) //20 * signs
               //alert, that seller can't complete the transaction
               var complete = "<script>";
               complete += "function completeTransaction() {";
               complete += "Swal.fire({type: 'error', title: 'You can&#39;t complete transaction!', text: 'Only buyer can complete the transaction!'})"
               complete += "}</script>";

               //start dispute
               var js_code = "function startDispute() {";
               js_code += "Swal.fire({type: 'error', title: 'You can&#39;t start dispute!', html: 'Only buyer can start the dispute!<br>If you need help, contact the support: support@escrowbitcoin.net'})"
               js_code += "}";

               var post = "<script>"
               post += js_code
               post += "</script>"
               //alert with qr Code
               complete += "<script>";
               complete += "function show() {";
               complete += "Swal.fire({imageUrl: '/"+image_qr_code_script+"', imageHeight: 250, imageWidth: 250, imageAlt: 'QR Code'})";
               complete += "}</script>";
               if (status == 'PAID'){
                 var escrow_status_icon = '<i class="fa  fa-check-circle-o" aria-hidden="true" style="color:green"></i>'
               }
               if (status == 'PENDING'){
                 var escrow_status_icon = '<i class="fa  fa-check-circle-o" aria-hidden="true" style="color:yellow"></i>'
               }
               if (status == 'COMPLETED'){
                 var escrow_status_icon = '<i class="fa  fa-check-circle-o" aria-hidden="true" style="color:green"></i>'
               }
               if (status == 'DISPUTE'){
                 var escrow_status_icon = '<i class="fa  fa-times-circle" aria-hidden="true" style="color:red"></i>' //fa-check-circle-o
                 //start dispute
                 js_code += "function startDispute() {";
                 js_code += "Swal.fire({type: 'error', title: 'You can&#39;t start dispute!', html: 'Transaction is already in dispute!'})"
                 js_code += "}";

                 var post = "<script>"
                 post += js_code
                 post += "</script>"
               }
               if(status == 'UNPAID'){
                 //show if amount is UNPAID
                 var deposit_address = "	  <tr>";
                 deposit_address += "		 <td></td>";
                 deposit_address += "		 <td></td>";
                 deposit_address += "		 <td>Deposit Address</td>";
                 deposit_address += "		 <td></td>";
                 deposit_address += "<td>"+address_deposit+" <span onclick='show()'><i class='fas fa-qrcode'></i></span></td>";
                 deposit_address += "	  </tr>";

                 var escrow_status_icon = '<i class="fa  fa-times-circle" aria-hidden="true" style="color:red"></i>' //fa-check-circle-o
               }
               else{
                 var deposit_address = ''
               }
               //send table
               dashboard(user_status, login_seller, secret1, closed, secret2, amount, seller_email, seller_address, buyer_email, details, status, date_escrow, complete, deposit_address, escrow_status_icon); //show dashboard
             }
             else{
               error()
             }
           }
         }

           //show dashboard
           function dashboard(user_status, login, secret1, closed, secret2, amount, seller_email, seller_address, buyer_email, details, status, date_escrow, complete, deposit_address, escrow_status_icon){
                        var table = "<html><head><title>EscrowBitcoin.net</title><link rel='stylesheet' href='css/tx-info.css'><script src='https://cdn.jsdelivr.net/npm/sweetalert2'></script>";
                        table += "<script src='https://kit.fontawesome.com/fd3de1e3ee.js'></script> <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script></head><body>";
                        table += "<div class='table-users'>";
                        table += "<div class='header'>Transaction<br>"+user_status+"</div>";
                        table += "	   <table cellspacing='0' class='tabletext'>";
                        table += "	  <tr>";
                        table += "		 <td></td>";
                        table += "		 <td></td>";
                        table += "		 <td>Transaction ID</td>";
                        table += "		 <td></td>";
                        table += "<td>"+login+"</td>";
                        table += "	  </tr>";
                        table += "	  <tr>";
                        table += "		 <td></td>";
                        table += "		 <td></td>";
                        table += "		 <td>Transaction Secret</td>";
                        table += "		 <td></td>";
                        table += "<td>"+secret1+closed+secret2+"</td>";
                        table += "	  </tr>";
                        table += "	  <tr>";
                        table += "		 <td></td>";
                        table += "		 <td></td>";
                        table += "		 <td>Escrow Amount</td>";
                        table += "		 <td></td>";
                        table += "<td>"+amount_and_fee+" BTC ("+amount+" BTC + "+fee+" BTC fee)</td>";
                        table += "	  </tr>";
                        table += "	  <tr>";
                        table += "		 <td></td>";
                        table += "		 <td></td>";
                        table += "		 <td>Seller's email address</td>";
                        table += "		 <td></td>";
                        table += "<td>"+seller_email+"</td>";
                        table += "	  </tr>";
                        table += "	  <tr>";
                        table += "		 <td></td>";
                        table += "		 <td></td>";
                        table += "		 <td>Seller's Bitcoin address</td>";
                        table += "		 <td></td>";
                        table += "<td>"+seller_address+"</td>";
                        table += "	  </tr>";
                        table += "	  <tr>";
                        table += "		 <td></td>";
                        table += "		 <td></td>";
                        table += "		 <td>Buyer's email address</td>";
                        table += "		 <td></td>";
                        table += "<td>"+buyer_email+"</td>";
                        table += "	  </tr>";
                        table += "	  <tr>";
                        table += "		 <td></td>";
                        table += "		 <td></td>";
                        table += "		 <td>Escrow Details</td>";
                        table += "		 <td></td>";
                        table += "<td>"+details+"</td>";
                        table += "	  </tr>";
                        table += "	  <tr>";
                        table += "		 <td></td>";
                        table += "		 <td></td>";
                        table += "		 <td>Escrow Status</td>";
                        table += "		 <td></td>";
                        table += "<td>"+status+" "+escrow_status_icon+"</td>";
                        table += "	  </tr>";
                        table += "	  <tr>";
                        table += "		 <td></td>";
                        table += "		 <td></td>";
                        table += "		 <td>Date</td>";
                        table += "		 <td></td>";
                        table += "<td>"+date_escrow+"</td>";
                        table += "	  </tr>";
                        //table += qr_alert;
                        table += deposit_address;
                        table += complete;
                        table += post;
                        table += " </table><div class='footerbuttons'><br><br><center><input type='submit' class='fadeIn fourth' value='Complete Transaction' onclick ='completeTransaction()'><right><input type='reset' class='fadeIn fourth' value='Start Dispute' onclick ='startDispute()'></right></center></div></div>"
                        table += "</body></html>";
                        res.send(table);
           }
           //show error message
           function error(){
             var html_wrong = "<head><title>EscrowBitcoin.net</title>";
             html_wrong += "<link rel='stylesheet' href='css/tx.css'></head><body>";
             html_wrong += "<div class='wrapper fadeInDown'>";
             html_wrong += "<div id='formContent'>";
             html_wrong += "<h2>Transaction</h2>";
             html_wrong += "<h3>Something went wrong . . .</h3>";
             html_wrong += "<h4>Do you have correct ID and secret?</h4>";
             html_wrong += '<div>Redirecting you back in <span id="time">00:05</span>!<br><p></div>';
             html_wrong += "<div id='formFooter'>";
             html_wrong += "<a class='underlineHover' href='/'>EscrowBitcoin.net</a>";
             html_wrong += "</div>";
            html_wrong += '<script>function startTimer(duration, display) {'+
            '    var timer = duration, minutes, seconds;'+
            '    setInterval(function () {'+
            '        minutes = parseInt(timer / 60, 10);'+
            '        seconds = parseInt(timer % 60, 10);'+
            '        minutes = minutes < 10 ? "0" + minutes : minutes;'+
            '        seconds = seconds < 10 ? "0" + seconds : seconds;'+
            '        display.textContent = minutes + ":" + seconds;'+
            '        if (--timer < 0) {'+
            '            timer = duration;'+
            '        }'+
            '    }, 1000);'+
            '}'+
            'window.onload = function () {'+
            '    var fiveSeconds = 1 * 5,'+
            '        display = document.querySelector(\'#time\');'+
            '    startTimer(fiveSeconds, display);'+
            '};</script>';
             html_wrong += '</div><script>setTimeout(function () {window.location = "/transaction";}, 6500)</script>';
             html_wrong += "</div>";
            res.send(html_wrong)
           }
       }
       catch (err){
         console.log("ERROR")
         res.send("INTERNAL SERVER ERROR! PLEASE CHECK YOUR INPUTS!")
       }
     });
  }
  catch(err){
    console.log("error " + err)
    res.send("INTERNAL SERVER ERROR, TRY AGAIN LATER")
  }
});

//create page for new transactions
app.get('/transaction-new', (req, res) => {
  var html = "<head><title>EscrowBitcoin.net</title>";
  html += "<link rel='stylesheet' href='css/tx.css'></head><body>";
  html += "<div class='wrapper fadeInDown'>";
  html += "<div id='formContent'>";
  html += "<h2>New Transaction</h2>";
  html += "<form action='/transaction-new-payment' method='POST' name='form1'>";
  html += "<input type='text' id='amount' class='fadeIn second' name='amount' placeholder='Amount (in BTC)' required='required'>";
  html += "<input type='email' id='seller_email' class='fadeIn third' name='seller_email' placeholder='Seller&apos;s email' required='required'><p>";
  html += "<input type='text' id='seller_address' class='fadeIn third' name='seller_address' placeholder='Seller&apos;s Bitcoin address' required='required'><p>";
  html += "<input type='email' id='buyer_email' class='fadeIn third' name='buyer_email' placeholder='Buyer&apos;s email' required='required'><p>";
  html += "<input type='text' id='details' class='fadeIn third' name='details' placeholder='Escrow Agreement & Details' required='required'><p>";
  html += "<input id='myForm' type='submit' class='fadeIn fourth' onClick='resetForm()' value='Create New Transaction'><br><a class='underlineHover' href='/transaction'>View Existing Transaction</a>";
  html += "</form>";
  html += "<div id='formFooter'>";
  html += "<a class='underlineHover' href='/'>EscrowBitcoin.net</a>";
  html += "</div>";
  html += "</div>";
  html += "</div><script>"
  html += "function resetForm() {"
  html += "document.getElementById('myForm').reset();"
  html += "}";
  res.send(html);
});

app.post('/transaction-new-payment', (req, res) => {
  //make sure that amount has less that 8 decimal places
  String.prototype.trimEllip = function (length) {
  return this.length > length ? this.substring(0, length) + "..." : this;
  }

  var amount_full = req.body.amount;
  var amount = parseFloat(parseFloat(amount_full).toFixed(8))
  var seller_email = req.body.seller_email;
  var seller_address = req.body.seller_address;
  var buyer_email = req.body.buyer_email;
  var details = req.body.details;
  var fee = parseFloat((amount * 0.05).toFixed(8))
  var qr_number = new Date().valueOf(); //unique number for qr code image name
  var qr_code_amount_total = amount*1.05
  var qr_code_amount = qr_code_amount_total.toFixed(8)
  //check if amount is integer or float
  function isInteger(x) { return typeof x === "number" && isFinite(x) && Math.floor(x) === x; }
  function isFloat(x) { return !!(x % 1); }
  //get address from database
  con.query("SELECT address FROM addresses WHERE status = 'UNUSED';", function (err, result) {
    try {
      if (err) throw err;
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      if (json[0] === undefined){
        //buyer secret is not in the database
        console.log("No more addresses!")
        res.send("INTERNAL SERVER ERROR, CONTACT "+support_email+"")
      }
      else{
        console.log("Bitcoin address: " + result[0].address);
        var deposit_address = result[0].address;
        //generate qr code from the address
        QRCode.toDataURL('bitcoin:' + deposit_address + '?amount='+qr_code_amount, { errorCorrectionLevel: 'H' }, function (err, url) {
          base64Img.img(url, 'dest', qr_number, function(err, filepath) {
            var qr = filepath.substring(4)
            //validate bitcoin address
            var valid = WAValidator.validate(seller_address, 'BTC');
            //validate emails
            var validate_seller_email = validator.validate(seller_email); // true
            var validate_buyer_email = validator.validate(buyer_email); // true
            console.log(valid + ' ' + validate_buyer_email + ' ' + validate_seller_email + ' ' + isFloat(amount) + ' ' + isInteger(amount))
            if(valid && validate_seller_email && validate_buyer_email && seller_email != buyer_email && (isInteger(amount) || isFloat(amount)) && amount_full >= 0.0001){
              //insert data to database
              var buyer_id = crypto.randomBytes(16).toString("hex"); //generate ID
              var buyer_secret = generateHexString(26) //generate secret - 104-/128-bit WEP: 26 digit key for buyer
              var seller_id = crypto.randomBytes(16).toString("hex"); //generate ID
              var seller_secret = generateHexString(26) //generate secret - 104-/128-bit WEP: 26 digit key for seller
              var status = 'UNPAID'
              //change status of bitcoin address
              var change_status_address = "UPDATE addresses SET status = 'UNPAID' WHERE address = '"+deposit_address+"';";
              con.query(change_status_address,  function (err, result) {
                if (err) throw err;
                if(result){
                  console.log("Bitcoin address status changed to UNPAID!")
                }
              });
              //insert all data to database
              var sql = "INSERT INTO escrow (buyer_id, seller_id, buyer_secret, seller_secret, date, amount, seller_email, seller_address, buyer_email, details, status, deposit_address, qr_image) VALUES ?";
              var values = [
              [buyer_id, seller_id, buyer_secret, seller_secret, datetime, amount, seller_email, seller_address, buyer_email, details, status, deposit_address, qr]
              ];

              con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
                console.log("Values: " + values)
              });
              //redirect to page with details
              res.redirect('/transaction-payment-details?date='+datetime+'&deposit='+deposit_address+'&amount='+amount);
              email_config.sendEmailsSeller(seller_email, buyer_email, amount, seller_address, details, seller_secret, seller_id);
              email_config.sendEmailsBuyer(seller_email, buyer_email, amount, seller_address, details, buyer_secret, buyer_id);
            }
            else{
              var html_wrong = "<head><title>EscrowBitcoin.net</title>";
              html_wrong += "<link rel='stylesheet' href='css/tx.css'></head><body>";
              html_wrong += "<div class='wrapper fadeInDown'>";
              html_wrong += "<div id='formContent'>";
              html_wrong += "<h2>Transaction</h2>";
              html_wrong += "<h3>Something went wrong . . .</h3>";
              html_wrong += "<h4>Do you have correct Bitcoin address and emails?<br> Is your amount greater than 0.0001 BTC?</h4>";
              html_wrong += '<div>Redirecting you back in <span id="time">00:05</span>!<br><p></div>';
              html_wrong += "<div id='formFooter'>";
              html_wrong += "<a class='underlineHover' href='/'>EscrowBitcoin.net</a>";
              html_wrong += "</div>";
             html_wrong += '<script>function startTimer(duration, display) {'+
             '    var timer = duration, minutes, seconds;'+
             '    setInterval(function () {'+
             '        minutes = parseInt(timer / 60, 10);'+
             '        seconds = parseInt(timer % 60, 10);'+
             '        minutes = minutes < 10 ? "0" + minutes : minutes;'+
             '        seconds = seconds < 10 ? "0" + seconds : seconds;'+
             '        display.textContent = minutes + ":" + seconds;'+
             '        if (--timer < 0) {'+
             '            timer = duration;'+
             '        }'+
             '    }, 1000);'+
             '}'+
             'window.onload = function () {'+
             '    var fiveSeconds = 1 * 5,'+
             '        display = document.querySelector(\'#time\');'+
             '    startTimer(fiveSeconds, display);'+
             '};</script>';
              html_wrong += '</div><script>setTimeout(function () {window.history.back();}, 6500)</script>';
              html_wrong += "</div>";
              res.send(html_wrong)
            }
          });
        })
      }
    }
    catch (err){
      res.send("INTERNAL SERVER ERROR, TRANSACTION WAS NOT CREATED! PLEASE CONTACT "+support_email+"!")
    }
  });
});

app.get('/transaction-payment-details', (req, res) => {
  //get data from database
  var amount = req.query.amount;
  var deposit = req.query.deposit;
  var date = req.query.date;

  console.log(date + " "+ amount+ " "+deposit)
  con.query("SELECT * FROM escrow WHERE date='"+date+"' AND deposit_address='"+deposit+"';", function (err, result) {
    try {
      var amount = result[0].amount
      var fee = parseFloat((amount * 0.05).toFixed(8))
      var seller_email = result[0].seller_email
      var buyer_email = result[0].buyer_email
      var seller_address = result[0].seller_address
      var details = result[0].details
      var deposit_address = result[0].deposit_address
      var qr = result[0].qr_image

        var html = "<head><title>EscrowBitcoin.net</title><link rel='stylesheet' type='text/css' href='fonts/font-awesome/css/font-awesome.css'>";
        html += "<link rel='stylesheet' href='css/tx.css'></head><body>";
        html += "<div class='wrapper fadeInDown'>";
        html += "<div id='formContent'>";
        html += "<h2>New Transaction</h2>";
        html += "<div>Amount: <br><strong>"+amount+" BTC <br> "+fee+" BTC fee (0.5%)</strong></div>";
        html += "<div>Seller's email: <br><strong>"+seller_email+"</strong></div>";
        html += "<div>Seller's Bitcoin address: <br><strong>"+seller_address+"</strong></div>";
        html += "<div>Buyer's email: <br><strong>"+buyer_email+"</strong></div>";
        html += "<div>Escrow Agreement & Details: <br><strong>"+details+"</strong></div>";
        html += "<div><br><br<br>Depost Address<strong><br>"+deposit_address+"</strong></div>";
        html += "<img src='"+qr+"' alt='Bitcoin QR  code'><br><hr>Details have been sent to buyer and seller. Check your email (including Spam folder) to find ID and secret for your transaction.<p><strong><a class='underlineHover' href='/transaction'>Login to the Dashboard</strong><p></a>";
        html += "</form>";
        html += "<div id='formFooter'>";
        html += "<a class='underlineHover' href='/'>EscrowBitcoin.net</a>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        res.send(html)
    }
    catch (err){
      res.status(500).send("INTERNAL SERVER ERROR, PLEASE CONTACT "+support_email+"!")
    }
  });
});

var port_2 = 80
app.listen(port_2, () => console.log(`Example app listening on port ${port_2}!`))

/* we will pass our 'app' to 'https' server
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
    //passphrase: 'password'
}, app)
.listen(port_https);

// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(port_http);*/

setInterval(() => {
    con.query('SELECT 1', (err, results) => {})
},5000)
