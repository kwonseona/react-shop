import React, { FC } from "react"
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"
import styles from "../styles/DarkModeToggle.module.css"

interface DarkModeToggleProps {
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  isRotated: boolean
  setIsRotated: React.Dispatch<React.SetStateAction<boolean>>
}

const DarkModeToggle: FC<DarkModeToggleProps> = ({
  darkMode,
  setDarkMode,
  isRotated,
  setIsRotated,
}) => {
  const handleToggleDarkMode = () => {
    setDarkMode((prevState) => !prevState)
    setIsRotated((prevState) => !prevState)
  }

  return (
    <label
      className={`${styles.swap} ${isRotated ? styles.rotated : ""}`}
      onClick={handleToggleDarkMode}
    >
      <HiOutlineMoon
        className={`${styles.hiMoon} ${isRotated ? styles.show : styles.hide}`}
      />
      <HiOutlineSun
        className={`${styles.hiSun} ${isRotated ? styles.hide : styles.show}`}
      />
    </label>
  )
}

export default DarkModeToggle
