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
      res.redirect(`/playlist/room/${newPlaylist.id}`);
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

router.post("/room/:id", (req, res, next) => {
  const playlistId = req.params.id;
  Playlist.findByIdAndUpdate(playlistId, { $pop: { songs: -1 } }, (err, result) => {
    if (err) { next(err); };
  });
  console.log("Tseeeee");

  setTimeout(() => { res.redirect(`/playlist/room/${playlistId}/`); }, 5000);
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
      // console.log("data", data);
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
  const songTitle = req.body.title;
  const songThumbnail = req.body.thumbnail;
  console.log(songId, songTitle, songThumbnail);
  console.log("id", playlistId);
  // title: songTitle, thumbnail: songThumbnail

  const update = {
    id: songId,
    title: songTitle,
    thumbnail: songThumbnail
  };
  Playlist.findByIdAndUpdate(playlistId, { $push: { songs: update } }, (err, result) => {
    if (err) { return next(err); };
    res.redirect(`/playlist/room/${playlistId}/`);
  });

  // Playlist.findOne({ _id: playlistId }, (err, result) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   result.songs.push(songId);

  //   const data = {
  //     result
  //   };
  //   console.log(playlistId);
  //   Playlist.update({ _id: playlistId }, { $set: data }, (err, rslt) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     console.log("reeesult", rslt);
  //     res.redirect(`/playlist/room/${playlistId}/`);
  //   });
  // });
});

// router.post("/room/:playlistID", (req, res, next) => {
//   // const playlistId = req.params.playlistID;
//   // const query = req.body.searchQuery;
//   // const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${process.env.YOUTUBE_API_KEY}`;
// });

module.exports = router;
