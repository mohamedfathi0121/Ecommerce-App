import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./Header";
function Layout() {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
