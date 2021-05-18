import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { useRouter } from "next/router";

import artists from "../public/artists.json";

import styles from "../styles/Search.module.scss";

export default function Search({ className = "", name = "" }) {
  const router = useRouter();
  const [filteredItems, setFilteredItems] = useState([
    {
      artist: "J Balvin",
    },
  ]);
  const [filter, setFilter] = useState(
    name.replace(/\b\w/g, (l) => l.toUpperCase())
  );
  const [focused, setFocused] = useState(false);
  const [cursor, setCursor] = useState(0);
  let filterOpts = {
    distance: 99999999,
    includeScore: true,
    threshold: 0.25,
    keys: ["artist"],
  };

  const searchInput = useRef(null);
  const list = useRef(null);

  function _onSelect(item) {
    router.push(`/artist/${item.artist}`);
    _blur();
  }

  function _getFilterItems(str) {
    if (!str) {
      return [];
    }

    return new Fuse(artists, filterOpts)
      .search(str)
      .reduce((result, { item, score }) => {
        if (score <= 0.1) {
          result.push(item);
        }

        return result;
      }, []);
  }

  function _onChangeFilter(ev) {
    setFilter(ev.target.value);
    setCursor(0);
  }

  function _blur() {
    searchInput.current.blur();
  }

  function _onSubmit(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    if (filter && filteredItems[cursor]) {
      _onSelect(filteredItems[cursor]);
    }
  }

  function _onKeyDown(ev) {
    if (ev.keyCode === 38) {
      ev.preventDefault();
      _onArrowUp();
    } else if (ev.keyCode === 40) {
      ev.preventDefault();
      _onArrowDown();
    } else if (ev.keyCode === 27) {
      _blur();
    }
  }

  function _onArrowUp() {
    let newCursor;
    if (cursor > 0) {
      newCursor = cursor - 1;
    } else {
      newCursor = filteredItems.length - 1;
    }
    setCursor(newCursor);
  }

  function _onArrowDown() {
    let newCursor;
    if (cursor < filteredItems.length - 1) {
      newCursor = cursor + 1;
    } else {
      newCursor = 0;
    }
    setCursor(newCursor);
  }

  useEffect(() => {
    const item = filteredItems[cursor];
    if (item) {
      const el = document.getElementById(
        `results-item-${encodeURIComponent(item.artist)}`
      );
      el && el.scrollIntoView(false);
    }
  }, [cursor]);

  useEffect(() => {
    setFilteredItems(_getFilterItems(filter));
  }, [filter]);

  useEffect(
    function () {
      setFilter(name);
    },
    [name]
  );

  return (
    <form className={`${className} ${styles.Search}`} onSubmit={_onSubmit}>
      <svg
        className={styles["Search-icon"]}
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.333 12.667A5.333 5.333 0 107.333 2a5.333 5.333 0 000 10.667zM14 14l-2.9-2.9"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        ref={searchInput}
        className={`${styles["Search-input"]} as-font--small-light as-color--main`}
        type="text"
        value={filter}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={_onChangeFilter}
        onKeyDown={_onKeyDown}
      />
      {filteredItems.length > 0 && focused && (
        <div className={styles["Search-resultsContainer"]}>
          <ul className={styles["Search-resultsList"]} ref={list}>
            {filteredItems.map((a, i) => {
              const isFocused = cursor === i;
              return (
                <li
                  key={`results-item-${i}`}
                  id={`results-item-${encodeURIComponent(a.artist)}`}
                  className={`${styles["Search-resultsItem"]} ${
                    isFocused ? styles["Search-resultsItemSelected"] : ""
                  } pv-5 ph-8 as-font--small as-color--main`}
                >
                  {a.artist.replace(/\b\w/g, (l) => l.toUpperCase())}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </form>
  );
}
