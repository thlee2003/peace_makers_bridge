import React from 'react';
import styles from './Home.module.css';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.home}>
      <Link to="/main" style={{ textDecoration: 'none' }}>
        <div>
          <p>메인 페이지</p>
          <img src="img/next.png" alt="" />
        </div>
      </Link>
      <Link to="/campaign" style={{ textDecoration: 'none' }}>
        <div>
          <p>소개 페이지</p>
          <img src="img/next.png" alt="" />
        </div>
      </Link>
      <Link to="/news" style={{ textDecoration: 'none' }}>
        <div>
          <p>소식 페이지</p>
          <img src="img/next.png" alt="" />
        </div>
      </Link>
      <Link to="/support" style={{ textDecoration: 'none' }}>
        <div>
          <p>후원 페이지</p>
          <img src="img/next.png" alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Home;
