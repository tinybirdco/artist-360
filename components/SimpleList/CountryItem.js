import Info from "./Info";

const FLAGS = {
  Germany: "🇩🇪",
  "United Kingdom": "🇬🇧",
  France: "🇫🇷",
  Italy: "🇮🇹",
  Spain: "🇪🇸",
  Portugal: "🇵🇹",
};

export default function CountryItem({ title, desc }) {
  return (
    <li className="flex-between-center pv-5">
      <Info
        maxWidth={"100%"}
        title={title.replace(/\b\w/g, (l) => l.toUpperCase())}
        desc={desc}
        icon={FLAGS[title]}
      />
    </li>
  );
}
