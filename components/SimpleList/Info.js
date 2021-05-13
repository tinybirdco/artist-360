export default function Info({ title, desc, img }) {
  return (
    <div className="flex">
      <div className="Avatar is-bigger as-bkg--tuna-100 mr-8">
        <img src={img} alt={title} title={title} />
      </div>
      <div className="overflow">
        <h4
          className="as-font--medium as-color--main no-spacing-1 overflow"
          title={title}
        >
          {title}
        </h4>
        <p
          className="as-font--small-light as-color--tuna-100 no-spacing-1 mt-2 overflow"
          title={desc}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
