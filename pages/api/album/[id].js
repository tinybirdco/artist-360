import fetch from "node-fetch";
import songData from "../../../public/song-data.json";

export default async (req, res) => {
  const { id } = req.query;
  const token = process.env.SPOTIFY_TOKEN;
  let image = null;
  let artists = null;
  const cacheSong = songData[id];

  if (cacheSong) {
    image = cacheSong.album.images.slice(-1)[0].url;
    artists = cacheSong.album.artists;
  }

  const song = await fetch(
    new URL(`/v1/tracks/${id}?market=ES`, "https://api.spotify.com"),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((r) => r.json())
    .then((d) => {
      if (d.error) {
        return { error: d.error };
      } else {
        return { data: d };
      }
    })
    .catch((e) => ({ error: e.toString() }));

  if (!song.error) {
    image = song.data.album.images.slice(-1)[0].url;
    artists = song.data.album.artists;
  }

  res.status(200).json({ id, image, artists });
};
