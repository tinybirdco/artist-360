export default function Figure({ label, number }) {
  return (
    <div style={{ textAlign: "right" }} className="ml-16">
      <p className="as-font--medium as-color--main no-spacing-1">
        {number.toLocaleString()}
      </p>
      <label className="as-font--small-light as-color--tuna-200 no-spacing-1 mt-2 overflow">
        {label}
      </label>
    </div>
  );
}
