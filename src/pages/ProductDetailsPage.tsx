import React, { useState, useEffect } from "react"
import {
  useParams,
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom"
import { useDarkMode } from "../DarkModeContext"
import { Product } from "../components/types"
import styles from "../styles/Product.module.css"
import Productstyles from "../styles/ProductPage.module.css"
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs"

interface ProductDetailsPageProps {
  addToCart: (product: Product) => void
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  addToCart,
}) => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const { darkMode } = useDarkMode()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => setProduct(data))
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  const rating = product.rating.rate
  const totalStars = 5
  const stars = []

  for (let i = 1; i <= totalStars; i++) {
    if (rating >= i) {
      stars.push(<BsStarFill key={i} className={styles.star} />)
    } else if (rating >= i - 0.5) {
      stars.push(<BsStarHalf key={i} className={styles.star} />)
    } else {
      stars.push(<BsStar key={i} className={styles.star} />)
    }
  }

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

  return (
    <>
      <div className={Productstyles.breadcrumbs}>
        <div className={Productstyles.container}>
          <div className={`${styles.topMenu} ${darkMode ? styles.dark : ""}`}>
            <ul className={Productstyles.menu}>
              <li>{getCategoryDisplayName(product.category)}</li>
              <li className={Productstyles.arrow}>{product.title}</li>
            </ul>
          </div>
        </div>
        <div className={styles.productDetailsContainer}>
          <div className={styles.productImageBox}>
            <figure>
              <img src={product.image} alt={product.title} />
            </figure>
          </div>
          <div className={styles.productDetailsBody}>
            <div className={styles.titleAndDescription}>
              <h2 className={styles.breadcrumbsTitle}>
                {product.title}
                <span className={styles.new}>NEW</span>
              </h2>
              <div className={styles.description}>
                <p>{product.description}</p>
              </div>
            </div>
            <div className={styles.rating}>
              {stars}
              <div className={styles.ratingText}>
                {product.rating.rate} / {product.rating.count} 참여
              </div>
            </div>
            <p className={styles.breadcrumbsPrice}>${product.price}</p>
            <div className={styles.breadcrumbsBtn}>
              <button
                className={styles.btnPrimary}
                onClick={() => product && addToCart(product)}
              >
                장바구니에 담기
              </button>
              <Link to="/cart">
                <button className={styles.btnOutline}>장바구니로 이동</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailsPage
