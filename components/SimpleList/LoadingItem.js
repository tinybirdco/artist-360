import { useState } from "react";

import styles from "../../styles/Loading.module.scss";

export default function LoadingItem() {
  const [titleWidth] = useState(_random(60, 150));
  const [descWidth] = useState(_random(40, 120));
  const [figureWidth] = useState(_random(30, 100));

  function _random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="flex-between-center pv-5">
      <div className="flex">
        <div className="">
          <span className={`Avatar is-bigger ${styles.Loading} mr-8`} />
        </div>
        <div>
          <div
            style={{ width: `${titleWidth}px` }}
            className={`${styles.Loading} ${styles.LoadingBar} as-bkg--tuna-100`}
          ></div>
          <div
            style={{ width: `${descWidth}px` }}
            className={`${styles.Loading} ${styles.LoadingBar} as-bkg--tuna-100 mt-2`}
          ></div>
        </div>
      </div>

      <div>
        <div
          className="flex"
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{ width: `${figureWidth}px` }}
            className={`${styles.Loading} ${styles.LoadingBar} as-bkg--tuna-100`}
          ></div>
          <div
            style={{ width: `80px` }}
            className={`${styles.Loading} ${styles.LoadingBar} as-bkg--tuna-100 mt-2`}
          ></div>
        </div>
      </div>
    </div>
  );
}
