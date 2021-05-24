import { useEffect, useState } from "react";
import useVisibilityChange from "use-visibility-change";

import Graph from "./ComplexGraph";

const TIME_FRAME_OPTIONS = [
  ["Real time", 0],
  ["7d", 7],
  ["1m", 30],
  ["All", 72],
];

export default function Plays({ size, endpoint, filters = {} }) {
  const [timeFrame, setTimeFrame] = useState(0);

  return (
    <div className="Card" style={{ gridColumn: size }}>
      <label className="as-font--caption as-color--tuna-200">LISTS</label>
      <div className="flex-between-center">
        <h3 className="flex as-font--medium as-color--main mt-2">
          <span>Plays</span>
        </h3>
        <ul className="flex">
          {TIME_FRAME_OPTIONS.map(([label, minutes]) => (
            <li key={`filter-${label}`} className="ml-6">
              <button
                onClick={() => setTimeFrame(minutes)}
                className={`as-color--${
                  timeFrame === minutes ? "main" : "tuna-200"
                } as-font--small-${timeFrame === minutes ? "semi" : "light"}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-30">
        <Graph
          timeFrame={timeFrame}
          animate={timeFrame === 0}
          endpoint={endpoint[timeFrame === 0 ? "rt" : "fixed"]}
          filters={{
            ...filters,
            days: timeFrame,
          }}
          graphWidth={600}
          graphHeight={200}
          strokeColor={"#000"}
          strokeWidth={2}
          strokeOpacity={1}
        />
      </div>
    </div>
  );
}
