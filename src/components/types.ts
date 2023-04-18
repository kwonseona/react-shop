export interface Rating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
  description: string
  rate: string
  count: string
  rating: Rating
}

export interface CartItem extends Product {
  quantity: number
}
