import style from "./Header.module.css";
import ShopCoLogo from "../assets/SHOP.CO.svg"; // Fixed import

function Header() {
    return (
        <header className={style.header}>
            <img className={style.logo} src={ShopCoLogo} alt="SHOP.CO logo" />
        </header>
    );
}

export default Header;