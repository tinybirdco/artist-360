import numeral from "numeral";

const STATIC_DATA = [
  {
    genre: "R&B",
    plays: 2342409,
  },
  {
    genre: "Pop",
    plays: 1972396,
  },
  {
    genre: "Hip Hop",
    plays: 1439097,
  },
  {
    genre: "Soul",
    plays: 890990,
  },
];

export default function Genres({ size }) {
  return (
    <div className="Card" style={{ gridColumn: size }}>
      <label className="as-font--caption as-color--tuna-200">LISTS</label>
      <h3 className="flex as-font--medium as-color--main mt-2">
        <span>Top Genres</span>
      </h3>
      <ul className="flex mt-16">
        {STATIC_DATA.map((item) => (
          <li key={item.genre} className="mr-16">
            <h4 className="as-font--huge-bold as-color--main no-spacing-3">
              {item.genre}
            </h4>
            <p className="as-font--small as-color--tuna-200 mt-2">
              <span className="as-color--main">
                {numeral(item.plays).format(",")}
              </span>{" "}
              Streams
            </p>
          </li>
        ))}
        <li>
          <h4 className="as-font--huge-bold as-color--tuna-100 no-spacing-3">
            +100
          </h4>
          <p className="mt-2">&nbsp;</p>
        </li>
      </ul>

      <button className="flex as-font--medium as-color--main mt-20">
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
