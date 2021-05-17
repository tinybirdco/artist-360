import { useEffect, useState } from "react";
import useVisibilityChange from "use-visibility-change";

// import Info from "./Info";
// import Figure from "./Figure";
import SimpleGraph from "../SimpleGraph";
// import LoadingItem from "./LoadingItem";
import useRequestChainInterval from "../../utils/use-request-chain-interval";
import Loader from "../Loader";

export default function Performance({
  size,
  title,
  showGraph = false,
  endpoint,
  interval,
  filters,
}) {
  const [localInterval, setLocalInterval] = useState(interval);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // revenue, stats, monthly listeners and followers
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
      <label className="flex as-font--caption as-color--tuna-200">
        <span>PERFORMANCE</span>
      </label>
      <h3 className="flex as-font--medium as-color--main mt-2">
        <span>Last Month</span>
        {loading && <Loader className="ml-4" />}
      </h3>

      <SimpleGraph
        data={[
          100, 234, 23, 234, 2, 324, 234, 100, 234, 23, 234, 2, 324, 234, 559,
          234, 23, 124, 734, 789,
        ]}
      />

      <div className="mt-10">
        <h3 className="as-font--huge-bold as-color--main no-spacing-3">
          123,552€
        </h3>
        <label className="as-font--small-light">
          <span className="as-color--main">Revenue</span>
          <span className="as-color--tuna-200 ml-4">Current</span>
        </label>
      </div>

      <hr
        className="mt-16 mb-10"
        style={{ border: "0", borderTop: "1px solid rgba(0,0,0,0.05)" }}
      />

      <ul>
        <li className="flex-between-center">
          <div>
            <h4 className="as-font--medium-light as-color--main">
              Monthy listeners
            </h4>
            <label className="as-font--small-light as-color--tuna-200">
              Current
            </label>
          </div>
          <h5 className="as-font--title-bold as-color--main no-spacing-1">
            54,5M
          </h5>
        </li>
      </ul>

      {/* <ul className="mt-12">
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
      </ul> */}
    </div>
  );
}
