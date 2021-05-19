import capitalizeString from "../../utils/capitalize-string";
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
        title={capitalizeString(title)}
        desc={desc}
        icon={FLAGS[title]}
      />
    </li>
  );
}
