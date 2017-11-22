"use strict";

const express = require("express");
const axios = require("axios");
const router = express.Router();
const Playlist = require("../models/playlist").Playlist;

/* GET playlist list all page. */
router.get("/list", (req, res, next) => {
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

router.post("/room/:playlistID/addSong", (req, res, next) => {
  const playlistId = req.params.playlistID;
  const query = req.body.searchQuery;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${process.env.YOUTUBE_API_KEY}`;
  axios
    .get(url)
    .then(response => {
      const data = {
        tempSongs: response.data.items,
        playlistId: playlistId
      };
      console.log("data", data);
      res.render("playlist/addSong", data);
    })
    .catch(err => console.log(err));
});

router.get("/room/:playlistID/addSong", (req, res, next) => {
  const playlistId = req.params.playlistID;
  Playlist.findById(playlistId, (err, playlist) => {
    if (err) { return next(err); }
    const data = {
      playlist: playlist
    };
    res.render("playlist/addSong", data);
  });
});

router.post("/room/:playlistID/song/:songID", (req, res, next) => {
  const playlistId = req.params.playlistID;
  const songId = req.params.songID;
  Playlist.findOneAndUpdate({ _id: playlistId } /*, push song ID into array songs */);
  res.send("playlist/addSong");
});

router.post("/room/:playlistID", (req, res, next) => {
  // const playlistId = req.params.playlistID;
  const query = req.body.searchQuery;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${process.env.YOUTUBE_API_KEY}`;
});

module.exports = router;
