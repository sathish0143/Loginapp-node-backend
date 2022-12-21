const express = require("express");
const routes = express.Router();
const gotoUser = require("./userroute");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://sathishramasamy2000:Satiz3998@cluster0.ic3ymyq.mongodb.net/My_server";

mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("mongodb connected succcessfully");
});
//!route to momgo route

routes.use("/user", gotoUser);

//! Default route for any error found
routes.get("*", (req, res) => {
  res.status(404);
  res.send("sorry bro... url not supported");
});
routes.post("*", (req, res) => {
  res.status(404);
  res.send("sorry bro..enter correct url");
});

module.exports = routes;
