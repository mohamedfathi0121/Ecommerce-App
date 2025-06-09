import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { Button } from "./ui/Buttons";

// React Icons
import { FaUser, FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", searchTerm);
    // Optional: navigate to search page
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
            />
            <button type="submit" className={styles.searchButton}>
              <FaSearch />
            </button>
          </form>

          <div className={styles.iconGroup}>
            <NavLink
              to="/favorites"
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
                `${styles.iconButton} ${isActive ? styles.active  : ""}`
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
        </nav>
      </div>
    </header>
  );
}

export default Header;
