"use strict";

const express = require("express");
const axios = require("axios");
const router = express.Router();
const Playlist = require("../models/playlist").Playlist;

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

// router.post("/playlist/search", (req, res, next) => {
//   const playlistId = req.params.playlistID;
//   const query = req.body.searchQuery;
//   axios
//     .get(/**/)
//     .then(response => {
//       const data = {
//         tempSongs: response.data.items,
//         playlistId: playlistId
//       };
//       // console.log("data", data);
//       res.render("playlist/addSong", data);
//     })
//     .catch(err => console.log(err));
// });
