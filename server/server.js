const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const knex = require("knex");
const path = require("path");
const bcrypt = require("bcryptjs");
const { default: axios } = require("axios");
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
    console.log("User already exists!");
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
  console.log(password);
  const exists = await db("characters")
    .select("password")
    .where("username", username);
  const passHash = bcrypt.compareSync(password, exists[0].password);
  console.log(exists);
  if (passHash) {
    console.log("Logged in, password matches!");
    res.json({ isLoggedin: true });
    return;
  } else {
    console.log("Incorrect username or password!");
    res.json({ isLoggedin: false });
    return;
  }
});
