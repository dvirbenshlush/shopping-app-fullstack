export interface Category {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  categoryId: number
  price: number
}

export interface CartItem {
  productId: number
  quantity: number
}
