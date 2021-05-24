const SERVICES = [
  ["Spotify", "spotify"],
  ["Apple Music", "apple"],
  ["Amazon", "amazon"],
  ["Deezer", "deezer"],
];

import styles from "../styles/ServiceFilter.module.scss";

export default function ServiceFilter({ onChange, value }) {
  return (
    <ul className={styles.ServiceFilter}>
      <li>
        <button
          onClick={() => onChange()}
          className={`${styles["ServiceFilter-button"]} ${
            !value ? styles["ServiceFilter-buttonSelected"] : ""
          } as-font--small mr-4`}
        >
          All
        </button>
      </li>
      {SERVICES.map(([label, key]) => (
        <li key={`service-filter-${key}`}>
          <button
            onClick={() => onChange(key)}
            className={`${styles["ServiceFilter-button"]} ${
              value === key ? styles["ServiceFilter-buttonSelected"] : ""
            } as-font--small mr-4`}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}
