import styles from '../../pages/sup.module.css';

const AuthLayout = ({ children, title }) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;