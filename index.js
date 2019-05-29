///const resetDataBase = require("./database/utils/db-tools");
const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(filename);
/// resetDataBase();
// db.run("PRAGMA foreign_keys = ON");
// const postmark = require("./postmark/postmark");
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 7000;
const isAuth = require("./midelware/isAuth");

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

app.use(isAuth);

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
/////////////////////////////////////////////ApplyGET////////////////////////
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
/////////////////////////////////////////////Apply-POST-postmark////////////////////////

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
      Subject: "Confirmation",
      TextBody: `Hi ${newRes.first_name},
      
      Thanks for volunteering in ${
        newRes.opportunity
      } group. we will review your application and will be in touch through your email.
      please feel free to reply to this email if you have any question.
      
      Mahshid Azami`
    });
  });
  res.sendStatus(200);
});

//////////////////////////////Response///////////////////

app.put("/api/aprove", function(req, res) {
  const newRes = req.body;
  const sql = `UPDATE applications SET response = "${
    newRes.response
  }" WHERE id = ?`;
  console.log(sql);
  db.all(sql, [newRes.id], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    client.sendEmail({
      From: "01707708@stockton.ac.uk",
      To: `${newRes.email}`,
      Subject: "Confirmation",
      TextBody: `Hi ${newRes.first_name},
      
      I am glad to let you know we would love you to join us on ${
        newRes.opportunity
      } group.
      
      Mahshid Azami`
    });
  });
  res.sendStatus(200);
});

app.put("/api/reject", function(req, res) {
  const newRes = req.body;
  const sql = `UPDATE applications SET response = "${
    newRes.response
  }" WHERE id = ?`;
  console.log(sql);
  db.all(sql, [newRes.id], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    client.sendEmail({
      From: "01707708@stockton.ac.uk",
      To: `${newRes.email}`,
      Subject: "Confirmation",
      TextBody: `Hi ${newRes.first_name},
      
      Unfortunately,I am afraid we couldn't have you in ${
        newRes.opportunity
      } group for now.we will let you know as soon as an opportunity arised.
        thanks for your interest.Hope to see you soon.
      
      Mahshid Azami`
    });
  });
  res.sendStatus(200);
});

//////////////////////////////REQUESTS//////////////////

app.get("/api/requests", (req, res) => {
  if (!req.isAuth) {
    throw new Error("Admin previllage");
  }
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

/////////////////////////////Respond///////////

app.get("/api/respond", (req, res) => {
  if (!req.isAuth) {
    throw new Error("Admin previllage");
  }
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

app.post("/api/respond", function(req, res) {
  if (!req.isAuth) {
    throw new Error("Admin previllage");
  }
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
      Subject: "Confirmation",
      TextBody: `Hi ${newRes.first_name},
      
      Thanks for volunteering in ${
        newRes.opportunity
      } group. we will review your application and will be in touch through your email.
      please feel free to reply to this email if you have any question.
      
      Mahshid Azami`
    });
  });
  res.sendStatus(200);
});

//////////////////////////Login///////////////////////

app.post("/api/register", (req, res) => {
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

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM admins WHERE email =?";
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).send("Error on the server.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    const passwordIsValid = password === user.password;

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "thisisthemostsecret",
      {
        expiresIn: 86400 // expires in 24 hours
      }
    );
    res.status(200).send({ userId: user.id, auth: true, token: token });
  });
});
/////////////////////////////////////////////////////////////////
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`server started listening at port ${port}`);
});
