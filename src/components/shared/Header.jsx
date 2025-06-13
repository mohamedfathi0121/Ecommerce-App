import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { Button } from "../ui/Buttons";
import { useAuth } from "../../context/authContext";
import { FaUser, FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import logo from "../../assets/SHOP.CO.svg"

function Header() {
  const { user, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", searchTerm);
    closeMenu();
  };

  const handleLogout = () => {
    signOut();
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          <img src={logo} alt="Shop.co Logo" />
        </NavLink>

        <button
          className={styles.toggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
          <div className={styles.navLinks}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              end
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={closeMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </div>

          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
              id="searchInput"
              aria-label="Search products"
            />

          { searchTerm && <Link to={`/search/?search=${searchTerm}`} onClick={closeMenu}>
            <button            
              className={styles.searchButton}
              aria-label="Submit search"
            >
              <FaSearch />
            </button>
            </Link>}
            
          </form>

          {loading ? (
            <div className={styles.loadingState}>Loading...</div>
          ) : user ? (
           <>
              <div className={styles.iconButtons}>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `${styles.iconButton} ${isActive ? styles.active : ""}`
                  }
                  aria-label="Favorites"
                  onClick={closeMenu}
                >
                  <FaHeart />
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `${styles.iconButton} ${isActive ? styles.active : ""}`
                  }
                  aria-label="Cart"
                  onClick={closeMenu}
                >
                  <FaShoppingCart />
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${styles.iconButton} ${isActive ? styles.active : ""}`
                  }
                  aria-label="Profile"
                  onClick={closeMenu}
                >
                  <FaUser />
                </NavLink>
              </div>
            
              <Button 
                title="Logout" 
                onClick={handleLogout} 
                aria-label="Logout"
              />
            
            </>
              
          ) : (
            <Link to="/login" onClick={closeMenu}>
              <Button title="Login" aria-label="Login" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;