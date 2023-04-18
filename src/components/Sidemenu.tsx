import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { HiOutlineMenu } from "react-icons/hi"
import styles from "../styles/Sidemenu.module.css"
import { useMediaQuery } from "@react-hook/media-query"

interface Props {
  darkMode: boolean
}

const SideMenu: React.FC<Props> = ({ darkMode }) => {
  const isSmallScreen = useMediaQuery("(max-width:1025px)")
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const sideMenuItems = [
    { name: "패션", path: "/fashion" },
    { name: "액세서리", path: "/accessories" },
    { name: "디지털", path: "/digital" },
  ]

  const handleToggleMenu = () => {
    setMenuOpen((prevState) => !prevState)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  return (
    <>
      {isSmallScreen && (
        <label className={styles.menuIcon}>
          <HiOutlineMenu
            className={`${styles.menu} ${darkMode ? styles.dark : ""}`}
            onClick={handleToggleMenu}
          />
        </label>
      )}
      <div className={`${styles.overlay} ${menuOpen ? styles.show : ""}`}></div>
      <div ref={menuRef} className={styles.pagemenu}>
        <div
          className={`${styles.menuContent} ${menuOpen ? styles.open : ""} ${
            darkMode ? styles.sideMenuDark : ""
          }`}
        >
          <ul className={styles.sideMenu}>
            {sideMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={styles.tab}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SideMenu
