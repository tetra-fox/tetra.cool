const URI = "https://mercury-chungkingosaurus.glitch.me/";

const req = new XMLHttpRequest();

const poll = () => {
    req.open("GET", URI, true);
    req.onload = () => {
        if (req.readyState === 4 && req.status === 200) {
            const res = JSON.parse(req.responseText);
            if (res.nowPlaying) {
                const np = `${res.artist.toLowerCase()} - ${res.name.toLowerCase()}`;
                document.getElementById("nowplaying").innerText = np;
                document.getElementById("nowplaying").style.display = "inline";
            }
        }
    };
    req.send();
}

poll();
setInterval(poll, 10000);