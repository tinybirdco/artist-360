import Logo from "./Logo";
import Search from "./Search";

import styles from "../styles/Header.module.scss";

export default function Header({ name }) {
  return (
    <header className={`${styles.Header} flex pv-6 ph-16`}>
      <Logo />
      <Search className="ml-20" name={name} />
    </header>
  );
}
