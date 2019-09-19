var nodemailer = require('nodemailer');

//variables
var email_address = 'no-reply@escrowbitcoin.net'
var email_password = 'escrowbitcoingeslo123'

/*create nodemailer transporter
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email_address,
    pass: email_password
  },
  tls: {
        rejectUnauthorized: false
    }
});*/

//create nodemailer transporter
/*var transporter = nodemailer.createTransport({
  //service: 'gmail',
  host: 'escrowbitcoin.net',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: email_address,
    pass: email_password
  },
  tls: {
        rejectUnauthorized: false
    }
});*/

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});



//get Date & time
var currentdate = new Date();
var datetime =  ('0' + currentdate.getDate()).slice(-2) + "/"
                +  ('0'+(currentdate.getMonth()+1)).slice(-2)  + "/"
                + currentdate.getFullYear() + " / "
                + ('0' + currentdate.getHours()).slice(-2) + ":"
                + ('0' + currentdate.getMinutes()).slice(-2) + ":"
                + ('0' + currentdate.getSeconds()).slice(-2);

//send confirmation emails for new transaction - SELLER secret
module.exports = {
    sendEmailsSeller: function(seller, buyer, amount, seller_address, details, secret, id){
      var date = datetime
      var seller_email = seller
      var  buyer_email = buyer
      var seller_address = seller_address
      var confirmation_email =  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
      '<html style="width:100%;font-family:arial, \'helvetica neue\', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">'+
      ' <head> '+
      '  <meta charset="UTF-8"> '+
      '  <meta content="width=device-width, initial-scale=1" name="viewport"> '+
      '  <meta name="x-apple-disable-message-reformatting"> '+
      '  <meta http-equiv="X-UA-Compatible" content="IE=edge"> '+
      '  <meta content="telephone=no" name="format-detection"> '+
      '  <title>New email template 2019-07-10</title> '+
      '  <!--[if (mso 16)]>'+
      '    <style type="text/css">'+
      '    a {text-decoration: none;}'+
      '    </style>'+
      '    <![endif]--> '+
      '  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> '+
      '  <style type="text/css">'+
      '@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button { font-size:20px!important; display:block!important; border-width:10px 0px 10px 0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }'+
      '#outlook a {'+
      '	padding:0;'+
      '}'+
      '.ExternalClass {'+
      '	width:100%;'+
      '}'+
      '.ExternalClass,'+
      '.ExternalClass p,'+
      '.ExternalClass span,'+
      '.ExternalClass font,'+
      '.ExternalClass td,'+
      '.ExternalClass div {'+
      '	line-height:100%;'+
      '}'+
      '.es-button {'+
      '	mso-style-priority:100!important;'+
      '	text-decoration:none!important;'+
      '}'+
      'a[x-apple-data-detectors] {'+
      '	color:inherit!important;'+
      '	text-decoration:none!important;'+
      '	font-size:inherit!important;'+
      '	font-family:inherit!important;'+
      '	font-weight:inherit!important;'+
      '	line-height:inherit!important;'+
      '}'+
      '.es-desk-hidden {'+
      '	display:none;'+
      '	float:left;'+
      '	overflow:hidden;'+
      '	width:0;'+
      '	max-height:0;'+
      '	line-height:0;'+
      '	mso-hide:all;'+
      '}'+
      '</style> '+
      ' </head> '+
      ' <body style="width:100%;font-family:arial, \'helvetica neue\', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"> '+
      '  <div class="es-wrapper-color" style="background-color:#F6F6F6;"> '+
      '   <!--[if gte mso 9]>'+
      '			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">'+
      '				<v:fill type="tile" color="#f6f6f6"></v:fill>'+
      '			</v:background>'+
      '		<![endif]--> '+
      '   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;"> '+
      '     <tr style="border-collapse:collapse;"> '+
      '      <td valign="top" style="padding:0;Margin:0;"> '+
      '       <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td style="padding:0;Margin:0;display:none;" align="center"></td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:20px;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;padding-bottom:15px;"> <h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#333333;">New Transaction at EscrowBitcoin.net<br></h2> </td> '+
      '                     </tr> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">New transaction was created at EscrowBitcoin.net.</p> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="40" bgcolor="#f6f6f6" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td style="padding:0;Margin:0;background-image:url(https://dbyeq.stripocdn.email/content/guids/cab_proj_abada9bfda6b68f2c968ec23659b9071/images/62721491838977423.png);background-position:center top;background-repeat:no-repeat;" align="center"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:20px;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;padding-bottom:20px;"> <h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#333333;">DON\'T SHARE THIS DATA! <br></h2> </td> '+
      '                     </tr> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Transaction ID: '+id+'</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Transaction Secret: '+secret+'<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Escrow Amount: '+amount+' BTC<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Escrow Details: '+details+' </p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Seller\'s address: '+seller_address+'<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Seller\'s email: '+seller_email+'<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Buyer\'s email: '+buyer_email+'<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Date: '+date+'<br></p></td> '+
      '                     </tr> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="center" style="padding:10px;Margin:0;"> <span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#2CB543;border-width:0px 0px 2px 0px;display:inline-block;border-radius:30px;width:auto;"> <a href="http:///escrowbitcoin.net/transaction" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#31CB4B;border-width:10px 20px 10px 20px;display:inline-block;background:#31CB4B;border-radius:30px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;">Dashboard</a> </span> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="15" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="51" bgcolor="#f6f6f6" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="40" bgcolor="#f6f6f6" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="40" bgcolor="#f6f6f6" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" align="center"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;text-align:center;">Copyright © 2019, <a href="https://escrowbitcoin.net">EscrowBitcoin.net</a><br></p> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> </td> '+
      '     </tr> '+
      '   </table> '+
      '  </div>  '+
      ' </body>'+
      '</html>';
      transporter.sendMail({
          from: 'Escrow Bitcoin <no-reply@escrowbitcoin.net>',
          to: seller,
          subject: 'New Transaction Created on EscrowBitcoin.net - Seller',
          html: confirmation_email
      }, (err, info) => {
          console.log(info.envelope);
          console.log(info.messageId);
      });
  },

    //send confirmation emails for new transaction - BUYER
    sendEmailsBuyer: function(seller, buyer, amount, seller_address, details, secret, id){
      let date = datetime;
      var seller_email = seller
      var  buyer_email = buyer
      var seller_address = seller_address
      var confirmation_email =  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
      '<html style="width:100%;font-family:arial, \'helvetica neue\', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">'+
      ' <head> '+
      '  <meta charset="UTF-8"> '+
      '  <meta content="width=device-width, initial-scale=1" name="viewport"> '+
      '  <meta name="x-apple-disable-message-reformatting"> '+
      '  <meta http-equiv="X-UA-Compatible" content="IE=edge"> '+
      '  <meta content="telephone=no" name="format-detection"> '+
      '  <title>New email template 2019-07-10</title> '+
      '  <!--[if (mso 16)]>'+
      '    <style type="text/css">'+
      '    a {text-decoration: none;}'+
      '    </style>'+
      '    <![endif]--> '+
      '  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> '+
      '  <style type="text/css">'+
      '@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button { font-size:20px!important; display:block!important; border-width:10px 0px 10px 0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }'+
      '#outlook a {'+
      '	padding:0;'+
      '}'+
      '.ExternalClass {'+
      '	width:100%;'+
      '}'+
      '.ExternalClass,'+
      '.ExternalClass p,'+
      '.ExternalClass span,'+
      '.ExternalClass font,'+
      '.ExternalClass td,'+
      '.ExternalClass div {'+
      '	line-height:100%;'+
      '}'+
      '.es-button {'+
      '	mso-style-priority:100!important;'+
      '	text-decoration:none!important;'+
      '}'+
      'a[x-apple-data-detectors] {'+
      '	color:inherit!important;'+
      '	text-decoration:none!important;'+
      '	font-size:inherit!important;'+
      '	font-family:inherit!important;'+
      '	font-weight:inherit!important;'+
      '	line-height:inherit!important;'+
      '}'+
      '.es-desk-hidden {'+
      '	display:none;'+
      '	float:left;'+
      '	overflow:hidden;'+
      '	width:0;'+
      '	max-height:0;'+
      '	line-height:0;'+
      '	mso-hide:all;'+
      '}'+
      '</style> '+
      ' </head> '+
      ' <body style="width:100%;font-family:arial, \'helvetica neue\', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"> '+
      '  <div class="es-wrapper-color" style="background-color:#F6F6F6;"> '+
      '   <!--[if gte mso 9]>'+
      '			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">'+
      '				<v:fill type="tile" color="#f6f6f6"></v:fill>'+
      '			</v:background>'+
      '		<![endif]--> '+
      '   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;"> '+
      '     <tr style="border-collapse:collapse;"> '+
      '      <td valign="top" style="padding:0;Margin:0;"> '+
      '       <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td style="padding:0;Margin:0;display:none;" align="center"></td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:20px;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;padding-bottom:15px;"> <h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#333333;">New Transaction at EscrowBitcoin.net<br></h2> </td> '+
      '                     </tr> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">New transaction was created at EscrowBitcoin.net.</p> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="40" bgcolor="#f6f6f6" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td style="padding:0;Margin:0;background-image:url(https://dbyeq.stripocdn.email/content/guids/cab_proj_abada9bfda6b68f2c968ec23659b9071/images/62721491838977423.png);background-position:center top;background-repeat:no-repeat;" align="center"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:20px;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;padding-bottom:20px;"> <h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#333333;">DON\'T SHARE THIS DATA! <br></h2> </td> '+
      '                     </tr> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Transaction ID: '+id+'</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Transaction Secret: '+secret+'<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Escrow Amount: '+amount+' BTC<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Escrow Details: '+details+' </p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Seller\'s address: '+seller_address+'<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Seller\'s email: '+seller_email+'<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Buyer\'s email: '+buyer_email+'<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;">Date: '+date+'<br></p></td> '+
      '                     </tr> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="center" style="padding:10px;Margin:0;"> <span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#2CB543;border-width:0px 0px 2px 0px;display:inline-block;border-radius:30px;width:auto;"> <a href="http://escrowbitcoin.net/transaction" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#31CB4B;border-width:10px 20px 10px 20px;display:inline-block;background:#31CB4B;border-radius:30px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;">Dashboard</a> </span> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="15" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="51" bgcolor="#f6f6f6" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="40" bgcolor="#f6f6f6" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="padding:0;Margin:0;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td height="40" bgcolor="#f6f6f6" align="center" style="padding:0;Margin:0;"> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> '+
      '       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> '+
      '         <tr style="border-collapse:collapse;"> '+
      '          <td align="center" style="padding:0;Margin:0;"> '+
      '           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" align="center"> '+
      '             <tr style="border-collapse:collapse;"> '+
      '              <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px;"> '+
      '               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                 <tr style="border-collapse:collapse;"> '+
      '                  <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> '+
      '                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> '+
      '                     <tr style="border-collapse:collapse;"> '+
      '                      <td align="left" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;color:#333333;text-align:center;">Copyright © 2019, EscrowBitcoin.net<br></p> </td> '+
      '                     </tr> '+
      '                   </table> </td> '+
      '                 </tr> '+
      '               </table> </td> '+
      '             </tr> '+
      '           </table> </td> '+
      '         </tr> '+
      '       </table> </td> '+
      '     </tr> '+
      '   </table> '+
      '  </div>  '+
      ' </body>'+
      '</html>';
  /*    var mailOptions = {
        from: 'no-reply@escrowbitcoin.net',
        to: buyer,
        subject: 'New Transaction Created on EscrowBitcoin.net - Buyer',
        html: confirmation_email
      };*/

      transporter.sendMail({
          from: 'Escrow Bitcoin <no-reply@escrowbitcoin.net>',
          to: buyer,
          subject: 'New Transaction Created on EscrowBitcoin.net - Buyer',
          html: confirmation_email
      }, (err, info) => {
          console.log(info.envelope);
          console.log(info.messageId);
      });
  }
}
