import React from "react"
import styles from "../styles/MainPage.module.css"
import Carousel from "../components/Carousel"
import ProductSection from "../components/ProductSection"

const MainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <ProductSection category="clothing" title="패션" />
      <ProductSection category="jewelery" title="악세서리" />
      <ProductSection category="electronics" title="디지털" />
    </div>
  )
}

export default MainPage
