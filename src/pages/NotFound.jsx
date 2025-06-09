import React from 'react';
import styles from './styles/NotFound.module.css';
import { Link } from 'react-router-dom'; // if you're using React Router

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Sorry, the page you're looking for doesn’t exist.</p>
        <Link to="/" className={styles.homeButton}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
