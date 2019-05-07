const resetDataBase = require("./database/utils/db-tools");
resetDataBase();

const express = require("express");
const bodyParser = require("body-parser");
const port = 5000;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Helllooooo!");
});

app.listen(port, console.log(`server started listening at port ${port}`));
