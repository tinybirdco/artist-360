import Info from "./Info";
import Figure from "./Figure";
import Graph from "../SimpleGraph";

export default function Item({ title, desc, figure, label, showGraph }) {
  return (
    <li className="flex-between-center pv-5">
      <Info
        title={title.replace(/\b\w/g, (l) => l.toUpperCase())}
        desc={desc.replace(/\b\w/g, (l) => l.toUpperCase())}
      />
      <div className="flex">
        {showGraph && <Graph />}
        <Figure label={label} number={figure} />
      </div>
    </li>
  );
}
