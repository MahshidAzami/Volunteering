const resetDataBase = require("./database/utils/db-tools");
const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(filename);
resetDataBase();

const express = require("express");
const bodyParser = require("body-parser");
const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/opportunities", (req, res) => {
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

// app.get("/", (req, res) => {
//   res.send("Helllooooo!");
// });

app.listen(port, console.log(`server started listening at port ${port}`));
