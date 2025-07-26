import { Product } from './productSlice';

interface Props {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductList = ({ products, onAddToCart }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow hover:shadow-md">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">₪{product.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            הוסף לסל
          </button>
        </div>
      ))}
    </div>
  )
}
