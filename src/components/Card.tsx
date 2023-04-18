import React from "react"
import styles from "../styles/Card.module.css"
import { Link } from "react-router-dom"
import { useDarkMode } from "../DarkModeContext"

interface CardProps {
  imageUrl: string
  title: string
  price: string
  id: number
}

const Card: React.FC<CardProps> = ({ imageUrl, title, price, id }) => {
  const { darkMode } = useDarkMode()
  return (
    <div className={`${styles.cardBox} ${darkMode ? styles.dark : ""}`}>
      <Link to={`/product/${id}`} className={styles.card}>
        <figure className={`${styles.cardImg} ${darkMode ? styles.dark : ""}`}>
          <img src={imageUrl} />
        </figure>
        <div className={styles.cardBody}>
          <p className={styles.cardTitle}>{title}</p>
          <p className={styles.cardPrice}>{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card
