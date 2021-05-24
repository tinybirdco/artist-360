import React, { useRef, useEffect } from "react";

import { select, scaleLinear, max, line, axisLeft } from "d3";

export default function SimpleGraph({
  graphWidth = 376,
  graphHeight = 100,
  data = new Array(30).fill(0),
  strokeColor = "#000",
  strokeOpacity = "0.1",
  strokeWidth = 3,
}) {
  const d3Container = useRef(null);

  const margin = { top: 0, right: 0, bottom: 10, left: 0 };

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = select(d3Container.current);

      const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, graphWidth]);

      const yScale = scaleLinear()
        .domain([max(data) || 1000, 0])
        .range([0, graphHeight]);

      const _line = line()
        .x(function (d, i) {
          return xScale(i);
        })
        .y(function (d, i) {
          return yScale(d);
        });

      svg.select(".line").datum(data).attr("d", _line);
    }
  }, [data, d3Container.current]);

  return (
    <div>
      {graphWidth > 0 && (
        <svg
          className="d3-component"
          width={graphWidth + margin.left + margin.right}
          height={graphHeight + margin.top + margin.bottom}
          transform={"translate(" + margin.left + "," + margin.top + ")"}
          ref={d3Container}
        >
          <defs>
            <clipPath id="clip">
              <rect
                width={graphWidth}
                height={graphHeight + margin.top + margin.bottom}
              ></rect>
            </clipPath>
          </defs>
          <g className="mamufas" clipPath={"url(#clip)"}>
            <g className="content">
              <path
                className="line"
                strokeOpacity={strokeOpacity}
                strokeWidth={strokeWidth}
                stroke={strokeColor}
                fill="none"
              />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}
