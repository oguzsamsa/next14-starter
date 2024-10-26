import styles from "./navbar.module.css";
import Links from "./links/Links";
import Link from "next/link";

const Navbar = async () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <div className={styles.logo}>Samsa</div>
      </Link>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
