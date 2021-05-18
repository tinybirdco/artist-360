import { useEffect, useState } from "react";
import useVisibilityChange from "use-visibility-change";

import LoadingItem from "./SimpleList/LoadingItem";
import Loader from "./Loader";
import useRequestChainInterval from "../utils/use-request-chain-interval";

export default function CountryList({
  size,
  title,
  endpoint,
  filters,
  item,
  items = 6,
  interval,
}) {
  const [localInterval, setLocalInterval] = useState(interval);
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
      setLocalInterval(null);
    } else {
      setData(data);
      setError(null);
    }

    setLoading(false);
  }

  useRequestChainInterval(_fetchData, localInterval);

  useVisibilityChange({
    onShow: () => {
      setLocalInterval(interval);
    },
    onHide: () => {
      setLocalInterval(null);
    },
  });

  useEffect(() => {
    setLocalInterval(interval);
  }, [interval]);

  useEffect(
    function () {
      if (localInterval) {
        _fetchData();
      }
    },
    [localInterval, filters]
  );

  return (
    <div className="Card" style={{ gridColumn: size }}>
      <label className="as-font--caption as-color--tuna-200">LISTS</label>
      <h3 className="flex as-font--medium as-color--main mt-2">
        <span>{title}</span>
        {loading && <Loader className="ml-4" />}
      </h3>

      <ul
        className="mt-12"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
      >
        {(loading && !data) || error || !data.length ? (
          <>
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
          </>
        ) : (
          <>{data.slice(0, items).map((d, i) => item(d, i, data))}</>
        )}
      </ul>
    </div>
  );
}
