import { useState, useEffect } from "react"
import styles from "../styles/Cart.module.css"
import Category from "../styles/ProductPage.module.css"
import items from "../styles/item.module.css"
import Popup from "./CartPopup"
import { CartItem } from "../components/types"
import { useDarkMode } from "../DarkModeContext"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

interface CartProps {
  cartItems: CartItem[]
  increaseQuantity: (itemId: number) => void
  decreaseQuantity: (itemId: number) => void
  updateCartItemCount: (count: number) => void
  removeAllItems: () => void
}

export default function Cart({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  updateCartItemCount,
  removeAllItems,
}: CartProps) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const { darkMode } = useDarkMode()

  useEffect(() => {
    const newCartItemCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    )
    updateCartItemCount(newCartItemCount)
  }, [cartItems, updateCartItemCount])

  const [showPopup, setShowPopup] = useState(false)

  const handlePurchaseClick = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className={Category.container}>
      <div className={`${Category.topMenu} ${darkMode ? Category.dark : ""}`}>
        <ul className={Category.menu}>
          <li>홈</li>
          <li className={Category.arrow}>장바구니</li>
        </ul>
      </div>
      <div className={`${styles.cartContainer} ${darkMode ? styles.dark : ""}`}>
        {cartItems.length === 0 ? (
          <>
            <h1 className={styles.cartH1}>장바구니에 물품이 없습니다.</h1>
            <Link to="/">
              <button
                className={`${styles.cartBtn} ${darkMode ? styles.dark : ""}`}
              >
                담으러 가기
              </button>
            </Link>
          </>
        ) : (
          cartItems.map((item) => (
            <div className={items.container} key={item.id}>
              <div className={items.img}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className={items.info}>
                <p className={items.title}>{item.title}</p>
                <p className={items.price}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <div>
                  <button
                    className={items.leftBtn}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className={items.count}>{item.quantity}</span>
                  <button
                    className={items.rightBtn}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {showPopup && (
          <Popup onClose={handleClosePopup} onRemoveAllItems={removeAllItems} />
        )}
        <div className={styles.confirm}>
          <span
            className={`${styles.totalPrice} ${styles.buyBtn} ${
              darkMode ? styles.dark : ""
            }`}
          >
            총: ${totalPrice.toFixed(2)}
          </span>
          <button
            className={`${styles.cartBtn} ${styles.buyBtn} ${
              darkMode ? styles.dark : ""
            }`}
            onClick={handlePurchaseClick}
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  )
}
