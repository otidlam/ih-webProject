"use strict";

const express = require("express");
const router = express.Router();

router.post("/playlist/search/", (req, res) => {
  var db = req.DubJubeDB;
  console.log(req.body);
  db.playlists.find({
    "name": req.body.name
  }, (err, data) => {
    if (err) { return err; }
    console.log(data);
  });
});
