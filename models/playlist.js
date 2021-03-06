"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name: String,
  // owner: userId
  songs: [{
    id: String,
    title: String,
    thumbnail: String
  }]
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = {
  Playlist: Playlist
};
