# EscrowBitcoin.net
Bitcoin escrow service

(c) fbslo, 2019/2020

---

<h1>THIS PROJECT HAVE MANY BUGS AND IT SHOULD BE REWRITTEN!</h1>

---

What do you need?

- Ubuntu 16.04 server
- Basic knowledge of NodeJS, MySQL and Bitcoin.

---

How to set up escrow service?


Copy the files and run `npm install` to install dependencies.

Create database named escrow with 3 tables: escrow (this is main database for transactions), addresses (for all addresses) and dispute (all disputes are here);

- escrow: date TEXT, amount DECIMAL (8, 8), seller_email TEXT, seller_address TEXT, buyer_email TEXT, details TEXT, status TEXT, seller_id TEXT, seller_secret TEXT, buyer_secret TEXT, buyer_id TEXT, deposit_address TEXT, qr_image TEXT;
- addresses: id INT, address TEXT, status TEXT;
- dispute:  buyer_id TEXT, seller_id TEXT, amount DECIMAL (8, 8), date TEXT, dispute_date TEXT, deposit_address TEXT, details TEXT;

Database must be on the same server as this file, or you must open remote access to mySQL database.

Generate 100 or more Bitcoin addresses at [BitAddress.org](https://www.bitaddress.org). Import addresses to Bitcoin wallet [Tutorial for Electrum wallet](https://bitcoinelectrum.com/importing-your-private-keys-into-electrum/).

Import all addresses to database, into table addresses (one address per row), set status to UNUSED.

Install sendmail to your server [Tutorial](https://tecadmin.net/install-sendmail-on-ubuntu/).

Edit database login details (var con), email and password (var email_address, var email_password).

Change ports to listen on the bottom (use 80 for http and 443 for https, is you are using linux server).

Run `npm dev run` command.

---

TODO:
- Rewrite entire code (use ejs templates)
- Add new addresses using deterministic wallet instead of user genrated keys.
- Add admin control dashboard
- Fix possible SQL injection vulnerabilities
- Fix XSS vulnerabilities
- Move all login details and passwords to seperated file.

---

THIS IS NOT FOR COMMERCIAL USE!!! YOU ARE NOT ALLOWED TO COPY, SELL, USE ANY PART OF THIS SOFTWARE FOR ANY MATERIAL GAINS OR COMMERCIAL USE!!!

---

If you want commercial licence, contact admin@fbslo.net. 
Price: $100 per year.

---

This is beta version. There are still bugs in the code, be careful.
