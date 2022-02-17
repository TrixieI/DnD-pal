const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const knex = require("knex");
const path = require("path");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const morgan = require("morgan");
const app = express();
env.config();
const port = process.env.PORT;
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.listen(port, () => console.log(`Server live on port: ${port}!`));

const imageUpload = multer({
  dest: "images",
});

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
// Registration
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if user exists or not
  const exists = await db("characters")
    .select("username")
    .where("username", username);
  if (exists.length > 0) {
    res.json({ exists: true });
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
  res.json({ created: true });
  return;
});
// Login
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = await db("characters")
    .select("username")
    .where("username", username);
  if (userExists.length <= 0) {
    res.json({ exists: false });
  } else {
    const userPassword = await db("characters")
      .select("password")
      .where("username", username);
    const passHash = bcrypt.compareSync(password, userPassword[0]?.password);
    if (userExists[0]?.username === undefined) {
      res.json({ msg: "Sorry, this username does not exist" });
    } else if (passHash && username === userExists[0].username) {
      res.json({ isLoggedin: true, user: username });
      return;
    } else res.json({ msg: "Sorry, incorrect password!" });
    return;
  }
});

// Image Upload
app.post("/image", imageUpload.single("image"), (req, res) => {
  try {
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;
    db.insert({
      filename,
      filepath,
      mimetype,
      size,
    })
      .into("image_files")
      .then(() => res.json({ success: true, filename }))
      .catch((err) =>
        res.json({ success: false, message: "upload failed", stack: err.stack })
      );
  } catch (e) {
    console.log(e);
  }
});
// Image Get
app.get("/image/:filename", (req, res) => {
  const { filename } = req.params;
  db.select("*")
    .from("image_files")
    .where({ filename })
    .then((images) => {
      if (images[0]) {
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, images[0].filepath);
        return res.type(images[0].mimetype).sendFile(fullfilepath);
      }
      return Promise.reject(new Error("Image does not exist"));
    })
    .catch((err) =>
      res
        .status(404)
        .json({ success: false, message: "not found", stack: err.stack })
    );
});
