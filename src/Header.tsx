import React, { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./styles/Header.module.css"
import { useDarkMode } from "./DarkModeContext"
import Sidemenu from "./components/Sidemenu"
import NavigationLinks from "./components/NavigationLinks"
import SearchBar from "./components/SearchBar"
import { Product } from "./components/types"

interface HeaderProps {
  products: Product[]
  cartItemCount: number
}

const Header: React.FC<HeaderProps> = ({ products, cartItemCount }) => {
  const { darkMode } = useDarkMode()

  return (
    <div className={`${styles.header} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.menuContainer}>
        <Sidemenu darkMode={darkMode} />
        <h1>
          <Link
            to="/"
            className={`${styles.title} ${darkMode ? styles.dark : ""}`}
          >
            React Shop
          </Link>
        </h1>
        <NavigationLinks darkMode={darkMode} />
        <SearchBar
          darkMode={darkMode}
          products={products}
          cartItemCount={cartItemCount}
        />
      </div>
    </div>
  )
}

export default Header
