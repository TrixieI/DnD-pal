const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const knex = require("knex");
const path = require("path");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const app = express();
env.config();
const port = process.env.PORT;
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Server live on port: ${port}!`));

const db = knex({
  client: process.env.CLIENTDB,
  connection: {
    host: process.env.HOSTDB,
    port: process.env.DBPORT,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASEDB,
  },
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if user exists or not
  const exists = await db("characters")
    .select("username")
    .where("username", username);
  if (exists.length > 0) {
    res.json({ msg: "User already exists!" });
    return;
  }

  const passHash = bcrypt.hashSync(password, 10);

  db("characters")
    .returning(["username", "password"])
    .insert({
      username: username,
      password: passHash,
    })
    .then((data) => console.log(data));
  res.json({ msg: "OK" });
  return;
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = await db("characters")
    .select("username")
    .where("username", username);
  console.log(userExists);
  if (userExists.length <= 0) {
    res.json({ msg: "Username doesn't exist!" });
    console.log("user doesn't exist");
  } else {
    const userPassword = await db("characters")
      .select("password")
      .where("username", username);
    const passHash = bcrypt.compareSync(password, userPassword[0]?.password);
    if (userExists[0]?.username === undefined) {
      res.json({ msg: "Sorry, this username does not exist" });
      console.log("Username doesn't exist");
    } else if (passHash && username === userExists[0].username) {
      res.json({ isLoggedin: true });
      return;
    } else res.json({ msg: "Sorry, incorrect password!" });
    console.log("incorrect password");
    return;
  }
});
