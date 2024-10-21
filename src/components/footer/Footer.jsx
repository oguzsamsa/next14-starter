import React from "react";
import styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>samsadev</div>
      <div className={styles.text}>
        Samsa creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
