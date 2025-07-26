import { Category } from './category.model';

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  categoryId: number
  category?: Category | null
  quantity?: number
}
