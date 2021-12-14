import { io } from "socket.io-client";

const uri = "wss://mercury-chungkingosaurus.glitch.me";
const socket = io(uri);

socket.on("connect", () => {
    console.log("connected to", uri);
});

socket.on("track", (data) => {
    console.log(data);
    if (data.nowPlaying) {
        const np = `${data.artist.toLowerCase()} – ${data.name.toLowerCase()}`;
        document.getElementById("nowplaying").innerText = np;
        document.getElementById("nowplaying").classList.add("visible");
    } else {
        document.getElementById("nowplaying").classList.remove("visible");
    }
});
