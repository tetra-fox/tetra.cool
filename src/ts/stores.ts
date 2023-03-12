import { readable } from "svelte/store";
import { io } from "socket.io-client";

import Song from "./song";

export const song = readable(new Song(), function start(set) {
  const socket = io("wss://mercury-chungkingosaurus.glitch.me");

  socket.on("track", (data) => {
    set(new Song(data.artist, data.name, data.nowPlaying));
  });

  return function stop() {
    socket.close();
  };
});

export const links = readable([
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/tetramsic"
  },
  {
    name: "Bandcamp",
    url: "https://tetrafox.bandcamp.com/"
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/3BCEPJ0GHgaZzCD5cSTEjv?si=vQ0-SYq4S6m_oiauOsS4Ww"
  },
  {
    name: "iTunes",
    url: "https://itunes.apple.com/us/artist/tetra/1470017364"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/etra_t"
  },
  {
    name: "Mastodon",
    url: "https://yiff.life/@tetra"
  },
  {
    name: "E-mail",
    url: "mailto:me@tetra.cool"
  }
]);
