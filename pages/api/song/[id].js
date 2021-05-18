import fetch from "node-fetch";

export default async (req, res) => {
  const { id } = req.query;
  const token = process.env.SPOTIFY_TOKEN;
  let image = null;
  let album = null;
  let artists = null;

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
    album = song.data.album.name;
    artists = song.data.album.artists;
  }

  res.status(200).json({ id, image, album, artists });
};
