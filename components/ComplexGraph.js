import React, { useRef, useEffect, useState } from "react";
import { select, scaleLinear, easeLinear, max, line, area } from "d3";
import numeral from "numeral";
import useVisibilityChange from "use-visibility-change";

const ANIMATION_SPEED = 1000;

export default function ComplexGraph({
  endpoint,
  filters,
  timeFrame,
  key = "plays",
  animate,
  graphWidth = 376,
  graphHeight = 100,
  strokeColor = "#000",
  strokeOpacity = "0.1",
  strokeWidth = 3,
}) {
  const [n, setN] = useState(!timeFrame ? 55 : timeFrame);
  const [data, setData] = useState(
    new Array(!timeFrame ? 58 : timeFrame).fill(0)
  );
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const d3Container = useRef(null);
  const barWidth = graphWidth / n;
  const margin = { top: 5, right: 5, bottom: 10, left: 5 };

  async function _setFullData() {
    let d = await _fetchData();

    if (d && d.length > 0) {
      setData(d.map((d) => d[key]));
    }
  }

  async function _setLastOcc() {
    // Add new value (don't stop the animation)
    const newData = data.slice(0);
    newData.shift();
    newData.push(0);
    setData(newData);

    // Update it with a real value
    let d = await _fetchData();

    if (d && d.length > 0) {
      const lastNewItem = d.pop();
      newData[newData.length - 1] = lastNewItem[key];
      setData(newData);
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

    if (!error && data.length > 0) {
      return data.slice(0, !timeFrame ? 58 : timeFrame);
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = select(d3Container.current);

      svg.on("mouseout", function () {
        svg.select(".tooltip").style("display", "none");
      });

      const xScale = scaleLinear()
        .domain([0, n - 1])
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

      if (animate) {
        svg
          .select(".content")
          .attr("transform", "translate(0," + margin.top + ")")
          .transition()
          .duration(ANIMATION_SPEED)
          .ease(easeLinear)
          .attr("transform", "translate(" + xScale(-1) + "," + margin.top + ")")
          .on("end", function () {
            if (visible && !timeFrame) {
              _setLastOcc();
            }
          });
      } else {
        svg
          .select(".content")
          .attr("transform", "translate(0," + margin.top + ")")
          .interrupt();
      }

      svg
        .selectAll(".bar")
        .attr("x", function () {
          const pos = select(this).attr("data-id");
          return xScale(pos) - graphWidth / n / 2;
        })
        .on("mouseover", function () {
          const i = select(this).attr("data-id");
          _updateTooltip(i);
        });

      function _updateTooltip(i) {
        const tooltip = svg.select(".tooltip");

        tooltip.attr("transform", "translate(" + xScale(i) + "," + 0 + ")");
        tooltip
          .select("circle")
          .attr("transform", `translate(0, ${yScale(data[i])})`);
        tooltip
          .select("text")
          .attr("text-anchor", () => (i + 3 > n ? "end" : "start"))
          .attr("x", () => (i + 3 > n ? "-5px" : "5px"))
          .text(function () {
            return numeral(data[i]).format("0,");
          });
        tooltip.style("display", null);
      }
    }
  }, [data, d3Container.current]);

  function _onTabFocus() {
    setVisible(true);
  }

  function _onTabBlur() {
    setVisible(false);
  }

  useVisibilityChange({ onShow: _onTabFocus, onHide: _onTabBlur });

  useEffect(
    function () {
      if (mounted) {
        setN(!timeFrame ? 55 : timeFrame);
      }
    },
    [timeFrame]
  );

  useEffect(
    function () {
      if (mounted && visible) {
        _setFullData();
      }
    },
    [filters, endpoint, timeFrame]
  );

  useEffect(
    function () {
      if (mounted && visible) {
        _setLastOcc();
      }
    },
    [visible]
  );

  useEffect(function () {
    setMounted(true);
    _setFullData();
  }, []);

  return (
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
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style={{
              stopColor: "rgba(247, 247, 247, 1)",
              stopOpacity: 1,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: "rgba(247, 247, 247, 0)",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
      </defs>
      <g className="mamufas" clipPath={"url(#clip)"}>
        <g className="content">
          <path
            className="line"
            strokeWidth={strokeWidth}
            stroke={strokeColor}
            strokeOpacity={strokeOpacity}
            fill="none"
          />
          <g className="bars">
            {new Array(n).fill(null).map((item, i) => {
              return (
                <rect
                  key={`bar-${i}`}
                  className="bar"
                  x={-(barWidth / 2) + i * barWidth}
                  y="0"
                  width={barWidth}
                  height={graphHeight}
                  opacity="0"
                  data-id={i}
                />
              );
            })}
            <rect
              key={`bar-${n + 1}`}
              className="bar"
              x={graphWidth - barWidth / 2}
              y="0"
              width={barWidth}
              height={graphHeight}
              opacity="0"
              data-id={n}
            />
          </g>
          <g className="tooltip" style={{ pointerEvents: "none" }}>
            <text
              className="tooltip-text"
              textAnchor="start"
              x="5px"
              y="10px"
              fill="#000"
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
              }}
            ></text>
            <circle r="3.5" fill="#000" />
            <line
              className="tooltip-line"
              x1="0"
              x2="0"
              y1="0"
              y2={graphHeight}
              stroke="#000"
              strokeWidth="1px"
            ></line>
          </g>
        </g>
        {!timeFrame && (
          <rect
            x="0"
            y="0"
            width={80}
            height={graphHeight + margin.top + margin.bottom}
            fill="url(#gradient)"
            style={{ pointerEvents: "none" }}
          />
        )}
      </g>
    </svg>
  );
}
