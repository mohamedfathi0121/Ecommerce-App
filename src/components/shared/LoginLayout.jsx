import { Link, Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import logo from "../../assets/SHOP.CO.svg"
export default function LoginLayout() {
  return (
    <div className="layout">
      <div className="row w-100 d-flex justify-content-start">
        <header className={styles.header}>
          <div className={styles.container}>
            <Link to="/" className={styles.logo}>
              <img src={logo}alt="Shop.co Logo" />
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
