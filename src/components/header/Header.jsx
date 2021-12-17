import React from 'react';
import styles from './Header.module.css';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/home" className={styles.back}>
        <img className={styles.arrow} src="img/back.png" alt="" />
      </Link>
      <div className={styles._logo}>
        <img className={styles.logo} src="img/Asset 23.svg" alt="" />
      </div>
    </div>
  );
};

export default Header;
