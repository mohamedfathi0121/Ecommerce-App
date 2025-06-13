import { Link, Outlet } from "react-router-dom";
import styles from "./layout.module.css";
export default function LoginLayout() {
  return (
    <div className="layout">
      <div className="row w-100 d-flex justify-content-start">
        <header className={styles.header}>
          <div className={styles.container}>
            <Link to="/" className={styles.logo}>
              <img src="/src/assets/SHOP.CO.svg" alt="Shop.co Logo" />
            </Link>
          </div>
        </header>
      </div>
      <div className={styles.loginMain}>
        <Outlet />
      </div>
    </div>
  );
}
