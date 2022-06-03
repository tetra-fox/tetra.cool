export default class Song {
    artist: string;
    title: string;
    playing: boolean;

    constructor(artist = "", title = "", playing = false) {
        this.artist = artist;
        this.title = title;
        this.playing = playing;
    }
}