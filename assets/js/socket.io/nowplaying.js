const websocket = "ws://mercury-chungkingosaurus.glitch.me";

const socket = io(websocket);

socket.on("connect", () => {
    console.log("connected to", websocket);
});

socket.on("track", (data) => {
    console.log(data)
    if (data.nowPlaying) {
        const np = `${data.artist.toLowerCase()} — ${data.name.toLowerCase()}`;
        document.getElementById("nowplaying").innerText = np;
        document.getElementById("nowplaying").className = "visible";
    } else {
        document.getElementById("nowplaying").className = "";
    }
});