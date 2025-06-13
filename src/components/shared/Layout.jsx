import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import style from "./layout.module.css";
function Layout() {
  return (
    <div className="layout">
      <div className="row w-100" ><Header /></div>
      <div className={style.main}><Outlet /></div>
      <Footer />
    </div>
  );
}
export default Layout;
