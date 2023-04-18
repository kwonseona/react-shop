import { useState, useEffect } from "react"
import { useProducts } from "./hooks/useProducts"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useDarkMode } from "./DarkModeContext"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import "./App.css"
import "./index.css"
import Header from "./Header"
import Footer from "./components/Footer"
import MainPage from "./pages/MainPage"
import { Product, CartItem } from "./components/types"
import CategoryPage from "./pages/CategoryPage"
import Grocery from "./pages/Grocery"
import Cart from "./pages/Cart"
import styles from "./AppDarkMode.module.css"

const App: React.FC = () => {
  const { darkMode } = useDarkMode()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartItemCount, setCartItemCount] = useState(0)
  const products = useProducts()
  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }

    setCartItemCount((prevCount) => prevCount + 1)
  }

  useEffect(() => {
    const unwantedDiv = document.getElementById("__endic_crx__")

    if (unwantedDiv) {
      unwantedDiv.remove()
    }
  }, [])

  const increaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const decreaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.reduce((accumulator: CartItem[], item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            accumulator.push({ ...item, quantity: item.quantity - 1 })
          }
        } else {
          accumulator.push(item)
        }
        return accumulator
      }, []),
    )
  }

  const updateCartItemCount = (count: number) => {
    setCartItemCount(count)
  }

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart")

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const removeAllItems = () => {
    localStorage.setItem("cart", JSON.stringify([]))
    setCartItems([])
    updateCartItemCount(0)
  }

  return (
    <Router>
      <div className={`${styles.body} ${darkMode ? styles.dark : ""}`}>
        <Header products={products} cartItemCount={cartItemCount} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/fashion"
            element={
              <CategoryPage
                products={products}
                category="clothing"
                categoryName="Fashion"
              />
            }
          />
          <Route
            path="/accessories"
            element={
              <CategoryPage
                products={products}
                category="jewelery"
                categoryName="Accessories"
              />
            }
          />
          <Route
            path="/digital"
            element={
              <CategoryPage
                products={products}
                category="electronics"
                categoryName="Digital"
              />
            }
          />
          <Route path="/grocery" element={<Grocery />} />
          <Route
            path="/product/:id"
            element={<ProductDetailsPage addToCart={addToCart} />}
          />
          <Route
            path="/Cart"
            element={
              <Cart
                cartItems={cartItems}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                updateCartItemCount={updateCartItemCount}
                removeAllItems={removeAllItems}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
