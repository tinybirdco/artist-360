export default function Footer() {
  return (
    <div className="pt-20 pb-30">
      <div className="Content">
        <div style={{ gridColumn: "1/6" }}>
          <p className="as-font--medium-semi no-spacing-1">
            <a className="as-color--main" href="https://galeo.tech">
              Galeo
            </a>{" "}
            for artists
            <sup className="as-font--label ml-4">
              by{" "}
              <a href="https://tinybird.co" className="as-color--main">
                Tinybird
              </a>
            </sup>
          </p>
        </div>
      </div>
    </div>
  );
}
