import { readable, type Readable } from "svelte/store";

export const song: Readable<Track | null> = readable(null, (set) => {
  let ws: WebSocket;
  let reconnectTimer: ReturnType<typeof setTimeout>;

  const connect = () => {
    ws = new WebSocket("wss://np.mesa.tetra.cool/ws");

    ws.addEventListener("message", (event) => {
      set(JSON.parse(event.data));
    });

    ws.addEventListener("close", () => {
      reconnectTimer = setTimeout(connect, 3000);
    });
  };

  connect();

  return () => {
    clearTimeout(reconnectTimer);
    ws?.close();
  };
});

export const links: Readable<Record<string, string>> = readable({
  "Bluesky": "https://bsky.app/profile/tetra.cool",
  "Soundcloud": "https://soundcloud.com/tetrafft",
  "Bandcamp": "https://tetrafft.bandcamp.com",
  "Spotify": "https://open.spotify.com/artist/3BCEPJ0GHgaZzCD5cSTEjv?si=vQ0-SYq4S6m_oiauOsS4Ww",
  "Apple Music": "https://itunes.apple.com/us/artist/tetra/1470017364",
  "GitHub": "https://github.com/tetra-fox",
  "E-mail": "mailto:me@tetra.cool"
});

interface Track {
  mbid: string,
  name: string,
  url: string,
  artist: NamedEntity,
  album: NamedEntity,
  image: Image,
  streamable: boolean,
  nowplaying: boolean,
}

interface NamedEntity {
  mbid: string,
  name: string
}

interface Image {
  small: string,
  medium: string,
  large: string,
  extralarge: string
}