import { useEffect, useState } from "react";

import LoadingItem from "./LoadingItem";
import Loader from "../Loader";

export default function SimpleList({
  size,
  title,
  endpoint,
  items = 3,
  item,
  filters,
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  async function _fetchData() {
    setLoading(true);

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
      setData(data);
      setError(null);
    }

    setLoading(false);
  }

  useEffect(
    function () {
      _fetchData();
    },
    [filters]
  );

  return (
    <div className="Card" style={{ gridColumn: size }}>
      <label className="as-font--caption as-color--tuna-200">LISTS</label>
      <h3 className="flex as-font--medium as-color--main mt-2">
        <span>{title}</span>
        {loading && <Loader className="ml-4" />}
      </h3>

      <ul className="mt-12">
        {(loading && !data) || error || !data.length ? (
          <>
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
          </>
        ) : (
          <>{data.slice(0, items).map((d, i) => item(d, i, data))}</>
        )}
      </ul>

      {data && data.length > 3 && (
        <button className="flex as-font--medium as-color--main mt-12">
          <span className="no-spacing-1">View all</span>
          <svg
            className="ml-3"
            width="12"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity=".2"
              d="M.5 11.5l11-11m0 0v11m0-11H.5"
              stroke="#000"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
