import style from "./Header.module.css";
import logo from "../assets/logo.png";

function Header () {
    return (
        <header className="header">
        <img className={style.logo} src={logo} alt="logo" />

        </header>
    );
}

export default Header;