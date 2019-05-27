///const resetDataBase = require("./database/utils/db-tools");
const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(filename);
/// resetDataBase();
// db.run("PRAGMA foreign_keys = ON");
// const postmark = require("./postmark/postmark");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 7000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
///////////////////////////////////////Opportunities/////////////////
app.get("/api/opportunities", (req, res) => {
  const sql = "SELECT * FROM opportunities";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      opportunity: rows
    });
  });
});
/////////////////////////////////////////////Apply////////////////////////
app.get("/api/apply", (req, res) => {
  const sql = "SELECT * FROM applications";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      applications: rows
    });
  });
});
/////////////////////////////////////////////////////////////////////

var postmark = require("postmark");
var client = new postmark.ServerClient("d8033137-9545-42db-84c1-581101321756");

app.post("/api/apply", function(req, res) {
  const newRes = req.body;
  const sql = `insert into applications (opportunity, first_name, surname, email, note)
  VALUES ("${newRes.opportunity}", "${newRes.first_name}", "${newRes.surname}",
   "${newRes.email}", "${newRes.note}")`;
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    client.sendEmail({
      From: "01707708@stockton.ac.uk",
      To: `${newRes.email}`,
      Subject: "second try",
      TextBody: "Hello from Postmark!"
    });
  });
  res.sendStatus(200);
});

///////////////////////Email/////////////////////////////////

// Require:

// Send an email:

// app.get("/email-confirmation", (req, res) => {
//   client.sendEmail({
//     From: "01707708@stockton.ac.uk",
//     To: "m.azami2008@gmail.com",
//     Subject: "first try",
//     TextBody: "Hello from Postmark!"
//   });
// });

//////////////////////////////REQUESTS//////////////////

app.get("/api/requests", (req, res) => {
  console.log("req req");
  const sql = "SELECT * FROM applications";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      requests: rows
    });
  });
});

//////////////////////////Login///////////////////////

app.post("/api/login", (req, res) => {
  const newRes = req.body;
  const sql = `insert into admins (email, password)
  VALUES ("${newRes.email}", "${newRes.password}")`;
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
  });

  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`server started listening at port ${port}`);
});
