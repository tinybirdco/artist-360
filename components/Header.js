import Logo from "./Logo";

import styles from "../styles/Header.module.scss";

export default function Header({ name }) {
  console.log(styles);

  return (
    <header className={`${styles.Header} flex pv-6 ph-16`}>
      <Logo />
    </header>
  );
}
