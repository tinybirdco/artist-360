import { useState, useEffect } from "react";

import Info from "./Info";
import Figure from "./Figure";
import Graph from "../SimpleGraph";

export default function Item({
  title,
  desc,
  figure,
  label,
  dataId,
  type,
  showGraph,
  graphKey,
  endpoint,
  filters,
}) {
  const [data, setData] = useState(new Array(30).fill(0));
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [artists, setArtists] = useState(null);

  async function _fetchImage() {
    const res = await fetch(`/api/${type}/${dataId}`)
      .then((r) => r.json())
      .then((d) => d);

    if (res.image) {
      setImage(res.image);
    }

    if (res.artists) {
      setArtists(res.artists);
    }
  }

  async function _fetchData() {
    let url = `https://api.tinybird.co/v0/pipes/${endpoint}.json?`;
    Object.keys(filters).forEach(function (key) {
      if (filters[key]) {
        const value = encodeURIComponent(filters[key]);
        url += `&${key}=${value}`;
      }
    });

    const { error, data } = await fetch(url)
      .then((r) => r.json())
      .then((d) => ({ data: d.data, error: d.error }))
      .catch((e) => ({ error: e.toString() }));

    if (error) {
      setData(null);
      setError(error);
    } else {
      setData(data.slice(-30).map((d) => d[graphKey]));
      setError(null);
    }
  }

  useEffect(function () {
    if (showGraph) {
      _fetchData();
    }
    _fetchImage();
  }, []);

  return (
    <li className="flex-between-center pv-5">
      <Info
        maxWidth={showGraph ? "50%" : "60%"}
        title={title.replace(/\b\w/g, (l) => l.toUpperCase())}
        desc={artists ? artists.map((a) => a.name).join(", ") : desc}
        image={image}
      />
      <div className="flex">
        {showGraph && <Graph graphHeight={30} graphWidth={125} data={data} />}
        <Figure label={label} number={figure} />
      </div>
    </li>
  );
}
