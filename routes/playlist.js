"use strict";

const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist").Playlist;

/* GET playlist list all page. */
router.get("/", (req, res, next) => {
  Playlist.find({}, (err, playlists) => {
    if (err) {
      next(err);
    } else {
      const data = {
        playlists: playlists
      };
      console.log(data);
      res.render("playlist/list", data);
    }
  });
});

/* GET playlist new page. */
router.get("/new", function (req, res, next) {
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
      res.redirect("/playlist/list");
    }
  });
});

/* GET playlist room page. */

router.get("/room", (req, res, next) => {
  const playlistId = req.query.id;
  Playlist.findById(playlistId, (err, playlist) => {
    if (err) { return next(err); }
    res.render("playlist/room", { playlist: playlist });
  });
});

router.post("/search", (req, res, next) => {
  const searchSong = req.query.searchSong;
  axios.get("dfdfddapi/searchSong").then(response => {
    const data = {
      searchResult: response.data
    };
    res.render("/search", data);
  });
});

module.exports = router;
