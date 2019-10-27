const URI = "http://lastfm-tetrafox-pw.herokuapp.com/";

const req = new XMLHttpRequest();
req.open("GET", URI, false);
req.send(null);

const res = JSON.parse(req.response);
const np = `${res.artist.toLowerCase()} - ${res.name.toLowerCase()}`;
document.getElementById("nowplaying").innerText = np;


if (!res.nowPlaying) {
    document.getElementById("nowplaying").style.display = "none";
}