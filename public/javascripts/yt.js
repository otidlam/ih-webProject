"use strict";

const firstSongId = document.getElementById("first-song");
const playlistId = document.getElementById("playlistId");
axios.get();
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady () {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: firstSongId.value,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady (event) {
  event.target.playVideo();
}
// when video ends
function onPlayerStateChange (event) {
  if (event.data === 0) {
    axios.post(`/playlist/room/${playlistId.value}`);
    location.reload();
  }
}
