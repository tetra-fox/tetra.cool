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
    name: "E-mail",
    url: "mailto:me@tetra.cool"
  }
]);
