import React, { FC } from "react"
import { Link } from "react-router-dom"
import styles from "../styles/NavigationLinks.module.css"

interface NavigationLinksProps {
  darkMode: boolean
}

const NavigationLinks: FC<NavigationLinksProps> = ({ darkMode }) => {
  const navLinks = [
    { name: "패션", path: "/fashion" },
    { name: "액세서리", path: "/accessories" },
    { name: "디지털", path: "/digital" },
  ]

  return (
    <div className={styles.nav}>
      {navLinks.map((link, index) => (
        <Link
          to={link.path}
          key={index}
          className={`${styles.list} ${darkMode ? styles.dark : ""}`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default NavigationLinks
