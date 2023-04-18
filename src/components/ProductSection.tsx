import React, { useState, useEffect } from "react"
import styles from "../styles/Fashion.module.css"
import { Product } from "./types"
import Card from "./Card"
import { useDarkMode } from "../DarkModeContext"

interface ProductSectionProps {
  category: string
  title: string
}

export default function ProductSection({
  category,
  title,
}: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([])
  const { darkMode } = useDarkMode()

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filteredProducts = data.filter((product) =>
          product.category.includes(category),
        )
        setProducts(filteredProducts.slice(0, 4))
      })
  }, [category])

  return (
    <div className={`${styles.mainSection} ${darkMode ? styles.dark : ""}`}>
      <h2 className={`${styles.mainTitle} ${darkMode ? styles.dark : ""}`}>
        {title}
      </h2>
      <div className={styles.mainGrid}>
        {products.map((product) => (
          <Card
            key={product.id}
            imageUrl={product.image}
            title={product.title}
            price={`$${product.price}`}
            id={product.id}
          />
        ))}
      </div>
    </div>
  )
}
