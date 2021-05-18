export default function Info({ title, desc, image, icon = "", maxWidth }) {
  return (
    <div className="flex" style={{ maxWidth }}>
      {image ? (
        <img
          className="Avatar is-bigger as-bkg--tuna-100 mr-8"
          src={image}
          alt={title}
          title={title}
        />
      ) : (
        <div
          className={`Avatar is-bigger as-bkg--${
            !icon ? "tuna-100" : "light"
          } mr-8`}
        >
          {icon && <span className="Avatar-icon">{icon}</span>}
        </div>
      )}

      <div className="overflow">
        <h4
          className="as-font--medium as-color--main no-spacing-1 overflow"
          title={title}
        >
          {title}
        </h4>
        <p
          className="as-font--small-light as-color--tuna-200 no-spacing-1 mt-2 overflow"
          title={desc}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
