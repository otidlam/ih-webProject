"use strict";

const express = require("express");
const axios = require("axios");
const router = express.Router();
const Playlist = require("../models/playlist").Playlist;

/* GET playlist list all page. */
router.get("/", (req, res, next) => {
  Playlist.find({}, (err, result) => {
    if (err) {
      next(err);
    } else {
      const data = {
        playlists: result
      };
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

router.get("/room/:playlistID", (req, res, next) => {
  const playlistId = req.params.playlistID;
  Playlist.findById(playlistId, (err, playlist) => {
    if (err) { return next(err); }
    const data = {
      playlist: playlist
    };
    res.render("playlist/room", data);
  });
});

router.post("/room/:playlistID/search", (req, res, next) => {
  const playlistId = req.params.playlistID;
  const query = req.body.searchQuery;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}=${query}&part=snippet`;
  axios
    .get(url)
    .then(response => {
      const data = {
        tempSongs: response.data.items
      };

      const newSongs = new Playlist(data);
      newSongs.save(err => {
        if (err) throw err;
      });
      // console.log("data", data);
      res.redirect(`/playlist/room/${playlistId}/addsong`);
    })
    .catch(err => console.log(err));
});

router.get("/room/:playlistID/addsong", (req, res, next) => {
  const playlistId = req.params.playlistID;
  Playlist.findById(playlistId, (err, playlist) => {
    if (err) { return next(err); }
    const data = {
      playlist: playlist
    };
    res.render("playlist/addsong", data);
  });
});

module.exports = router;
