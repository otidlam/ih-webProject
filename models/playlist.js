"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name: String,
  // owner: userId
  tempSongs: [],
  songs: [
    // songID API soundcloud
  ]
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = {
  Playlist: Playlist
};
