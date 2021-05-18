export default function Logo() {
  return (
    <p className="flex as-font--medium-semi no-spacing-1">
      <a href="https://galeo.tech" className="flex as-color--main">
        <img
          className="mr-2"
          width={20}
          src="/galeo.png"
          title="Galeo"
          alt="Galeo"
        />
        <span>for artists</span>
      </a>
      <sup className="as-font--label ml-3">
        by{" "}
        <a href="https://tinybird.co" className="as-color--main">
          Tinybird
        </a>
      </sup>
    </p>
  );
}
