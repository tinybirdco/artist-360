import { useEffect, useState } from "react";

import SimpleGraph from "../SimpleGraph";
import Loader from "../Loader";
import numeral from "numeral";
import { CountUp } from "use-count-up";

export default function Performance({ size, endpoint, filters }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [daysStats, setDaysStats] = useState(new Array(30).fill(0));
  const [revenue, setRevenue] = useState(0);
  const [plays, setPlays] = useState(0);

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
      setError(error);
      setData(null);
    } else {
      setData(data.slice(-30));
      setError(null);
    }

    setLoading(false);
  }

  useEffect(
    function () {
      if (data) {
        let d = {
          totalIncome: 0,
          totalPlays: 0,
          stats: [],
        };

        data.forEach(({ income, plays }) => {
          d.totalIncome = d.totalIncome + income;
          d.totalPlays = d.totalPlays + plays;
          d.stats.push(plays);
        });

        setRevenue(d.totalIncome);
        setPlays(d.totalPlays);
        setDaysStats(d.stats);
      }
    },
    [data]
  );

  useEffect(
    function () {
      _fetchData();
    },
    [filters]
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

      <SimpleGraph data={daysStats} />

      <div className="mt-10">
        <h3 className="as-font--huge-bold as-color--main no-spacing-3">
          <CountUp
            isCounting
            start={0}
            end={revenue}
            duration={1}
            suffix={"€"}
            formatter={(v) => `${numeral(v).format(",")}€`}
          />
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
            <CountUp
              isCounting
              end={plays}
              duration={1}
              formatter={(v) => numeral(plays).format("0a")}
            />
          </h5>
        </li>
      </ul>
    </div>
  );
}
