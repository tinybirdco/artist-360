import Select from "react-select";
import { countries } from "countries-list";

export default function CountryDropdown({ value, onChange }) {
  const options = Object.keys(countries).map(function (key) {
    const info = countries[key];
    return { value: info.name, label: `${info.emoji} ${info.name}` };
  });

  return (
    <div style={{ width: "240px" }}>
      <Select
        defaultValue={value}
        options={options}
        isSearchable={true}
        isClearable={false}
        placeholder={"🌎 World"}
        classNamePrefix={"CustomSelect"}
      />
    </div>
  );
}
