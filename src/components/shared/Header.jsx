import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { Button } from "../ui/Buttons";
import { useAuth } from "../../context/authContext";
import { FaUser, FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";

function Header() {
  const { user, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", searchTerm);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img src="/src/assets/SHOP.CO.svg" alt="Shop.co Logo" />
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
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
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

          { searchTerm && <Link to={`/search/?search=${searchTerm}`}>
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
                >
                  <FaHeart />
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `${styles.iconButton} ${isActive ? styles.active : ""}`
                  }
                  aria-label="Cart"
                >
                  <FaShoppingCart />
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${styles.iconButton} ${isActive ? styles.active : ""}`
                  }
                  aria-label="Profile"
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
            <Link to="/login">
              <Button title="Login" aria-label="Login" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;