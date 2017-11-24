const passport = require("passport");
const express = require("express");
const router = express.Router();
const User = require("../models/user").User;
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  const data = {
    message: req.flash("error")
  };
  res.render("auth/signup", data);
});
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    const data = {
      message: "Please provide username and password"
    };
    res.redirect("/signup", data);
    return;
  }
  User.findOne({ username }, "username", (err, user) => {
    if (err) {
      next(err);
      return;
    }
    if (user) {
      const data = {
        message: "The username already exists"
      };
      res.render("auth/signup", data);
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: hashPass
    });
    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    });
  });
});
router.get("/login", (req, res, next) => {
  const data = {
    message: req.flash("error")
  };
  res.render("auth/login", data);
});
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
