import { readable, type Readable } from "svelte/store";
import { io } from "socket.io-client";

export const song: Readable<Song> = readable({ artist: "", title: "", playing: false }, (set) => {
  const socket = io("wss://mercury-chungkingosaurus.glitch.me");

  socket.on("track", (data) => {
    set({ artist: data.artist, title: data.name, playing: data.nowPlaying });
  });

  return () => {
    socket.close();
  };
});

export const links: Readable<NamedLink[]> = readable([
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
