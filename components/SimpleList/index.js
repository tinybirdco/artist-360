import { useEffect, useState } from "react";
import useVisibilityChange from "use-visibility-change";

import Info from "./Info";
import Figure from "./Figure";
import Graph from "./Graph";
import LoadingItem from "./LoadingItem";
import Loader from "../Loader";
import useRequestChainInterval from "../../utils/use-request-chain-interval";

export default function SimpleList({
  size,
  title,
  showGraph = false,
  endpoint,
  interval,
  filters,
}) {
  const [localInterval, setLocalInterval] = useState(interval);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // name, desc, figure, graph
  const [error, setError] = useState(false);

  async function _fetchData() {
    setLoading(true);

    const { error, data } = await fetch(
      `https://api.tinybird.co/v0/pipe/${endpoint}.json`
    )
      .then((data) => ({ data }))
      .catch((e) => ({ error: e.toString() }));

    if (error) {
      setLocalInterval(null);
      setError(error);
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

      <ul className="mt-12">
        {(loading && !data.length) || (error && !data.length) ? (
          <>
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
          </>
        ) : (
          <>
            <li className="flex-between-center pv-5">
              <Info title="Otra noche sin tí" desc={"J. Balvin, Khalid"} />
              <div className="flex">
                {showGraph && <Graph />}
                <Figure label="Streams" number={2432432} />
              </div>
            </li>
          </>
        )}
      </ul>

      <button className="flex as-font--medium as-color--main mt-12">
        <span className="no-spacing-1">View all</span>
        <svg
          className="ml-3"
          width="12"
          height="12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path opacity=".2" d="M.5 11.5l11-11m0 0v11m0-11H.5" stroke="#000" />
        </svg>
      </button>
    </div>
  );
}
