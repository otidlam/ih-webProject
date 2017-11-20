"use strict";

const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist").Playlist;


/* GET playlist list all page. */
router.get("/", function(req, res, next) {
  Playlist.find({}, (err, res) => {
    if (err) {
      next(err);
    } else {
      const data = {
        playlists: res
      };
      res.render("playlist/list", data);
    }
  });
});

/* GET playlist new page. */
router.get("/new", function(req, res, next) {
  res.render("playlist/new");
});

router.post("/new", (req, res, next) => {
  const name = req.body.playlistName;
  const newPlaylist = new Playlist({
    name
  });
  newPlaylist.save(err => {
    if (err) {
      next(err);
    } else {
      res.redirect("/playlist");
    }
  });
});




module.exports = router;
