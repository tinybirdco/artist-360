import Select from "react-select";
import countries from "../public/countries.json";

export default function CountryDropdown({ country, onChange }) {
  const options = Object.keys(countries).map(function (key) {
    const emoji = countries[key];
    return { value: key, label: `${emoji} ${key}` };
  });

  return (
    <div style={{ width: "240px" }}>
      <Select
        defaultValue={
          country
            ? {
                label: `${countries[country]} ${country}`,
                value: country,
              }
            : null
        }
        options={options}
        isSearchable={true}
        isClearable={true}
        placeholder={"🌎 World"}
        classNamePrefix={"CustomSelect"}
        onChange={(res) => onChange(res ? res.value : null)}
      />
    </div>
  );
}
