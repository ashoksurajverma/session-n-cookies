const express = require("express");
const mongoose = require("mongoose")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const mongoDBStore = require("connect-mongodb-session")(session);

const store = new mongoDBStore ({
  uri: "mongodb://localhost:27017/mybdagain",
  collection: 'sessions'
})

const PORT = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: store,
}))

app.get("/", (req, res) => {
  req.session.isLoggedIn = true;
  res.setHeader("Set-Cookie", "isLogIn=true")
  res.status(200).json({
    message: "Get money"
  })
})

mongoose
.connect("mongodb://localhost:27017/mybdagain")
.then(result => {
  console.log("======= Connected to mongoDB --------")
})
.catch(err => {
  console.log("==== MONGO DB ERROR ++++++")
  console.log(err);
})
app.listen(PORT, () => {
  console.log("Server is running on port: "+ PORT);
})