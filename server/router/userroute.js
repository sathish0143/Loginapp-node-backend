const userRoutes = require("express").Router();
const User = require("./signupschema.model");

//!route get for mongodb
userRoutes.get("/", (req, res) => {
  User.find({}).exec((err, data) => {
    if (err) {
      console.err(err);
      res.send("cant fetch data from mongodb");
    } else {
      res.status(200);
      res.json(data);
    }
  });
});

//!get data by id
userRoutes.get("/:id", (req, res) => {
  User.findById({ _id: req.params.id }).exec((err, data) => {
    if (err) {
      console.error(err);
      res.send("cant fetch data from mongodb");
    } else {
      res.status(200);
      res.json(data);
    }
  });
});

//!route post for mongodb
userRoutes.post("/signup", (req, res) => {
  User.create(req.body, (err, data) => {
    if (err) {
      console.error(err);
      res.send("cant create user");
    } else {
      res.status(200);
      res.json(data);
    }
  });
});
//!route post for Login
userRoutes.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, data) => {
    if (!data) {
      res.status(404);
      res.json({ msg: "Error: User Not Exist,Please Signup" });
    } else if (data.password == req.body.password) {
      res.status(200);
      res.json({ msg: "true" });
    } else {
      res.json({ msg: "Error: Please Enter Correct Password" });
    }
  });
});

//!route Update for mongodb
userRoutes.put("/:id", (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
    if (err) {
      console.error(err);
      res.send("cant Update user");
    } else {
      res.status(200);
      res.json(data);
    }
  });
});

//!delete from mongo db
userRoutes.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.error(err);
      res.send("cant deelte user");
    } else {
      res.status(200);
      res.json(data);
    }
  });
});

module.exports = userRoutes;
