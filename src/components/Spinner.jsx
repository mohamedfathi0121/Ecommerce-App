
import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <h2>loading...</h2>
    </div>
  );
};

export default Spinner;
