import { useState, useEffect } from "react"
import { Product } from "../components/types"

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
  }, [])

  return products
}
