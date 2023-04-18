import { createContext, useContext, useState } from "react"

interface CartContextData {
  cartItemCount: number
  updateCartItemCount: (count: number) => void
}

const CartContext = createContext<CartContextData>({
  cartItemCount: 0,
  updateCartItemCount: () => {},
})

export const useCart = () => useContext(CartContext)

interface CartProviderProps {
  children: React.ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0)

  const updateCartItemCount = (count: number) => {
    setCartItemCount(count)
  }

  return (
    <CartContext.Provider value={{ cartItemCount, updateCartItemCount }}>
      {children}
    </CartContext.Provider>
  )
}
