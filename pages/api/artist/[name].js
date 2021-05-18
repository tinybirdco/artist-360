import fetch from "node-fetch";
import artists from "../../../public/artists.json";

export default async (req, res) => {
  const { name } = req.query;
  const token = process.env.SPOTIFY_TOKEN;
  let avatar = null;
  let followers = null;
  const artistObj = artists.find((a) => a.artist === name);

  if (artistObj) {
    const song = await fetch(
      new URL(`/v1/tracks/${artistObj.song_id}`, "https://api.spotify.com"),
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
      const artistId = song.data.artists[0].id;

      const artist = await fetch(
        new URL(`/v1/artists/${artistId}`, "https://api.spotify.com"),
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

      if (!artist.error) {
        const image = artist.data.images.slice(-1)[0];
        avatar = image.url;
        followers = artist.data.followers.total;
      }
    }
  }

  res.status(200).json({ name, avatar, followers });
};
