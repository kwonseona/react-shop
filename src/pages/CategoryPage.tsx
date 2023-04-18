import React from "react"
import styles from "../styles/ProductPage.module.css"
import Card from "../components/Card"
import { Product } from "../components/types"
import { useDarkMode } from "../DarkModeContext"

interface CategoryPageProps {
  products: Product[]
  category: string
  categoryName: string
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  products,
  category,
  categoryName,
}) => {
  const { darkMode } = useDarkMode()
  const filteredProducts = products.filter((product) =>
    product.category.includes(category),
  )

  const getCategoryDisplayName = (category: string) => {
    if (category.toLowerCase().includes("clothing")) {
      return "패션"
    } else if (category.toLowerCase().includes("jewelery")) {
      return "액세서리"
    } else if (category.toLowerCase().includes("electronics")) {
      return "디지털"
    } else {
      return category
    }
  }

  const displayName = getCategoryDisplayName(category)

  return (
    <div className={styles.container}>
      <div className={`${styles.topMenu} ${darkMode ? styles.dark : ""}`}>
        <ul className={styles.menu}>
          <li>홈</li>
          <li className={styles.arrow}>{displayName}</li>
        </ul>
      </div>
      <article className={styles.productSecion}>
        <h2 className={`${styles.pageTitle} ${darkMode ? styles.dark : ""}`}>
          {displayName}
        </h2>
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              imageUrl={product.image}
              title={product.title}
              price={`$${product.price}`}
              id={product.id}
            />
          ))}
        </div>
      </article>
    </div>
  )
}

export default CategoryPage
