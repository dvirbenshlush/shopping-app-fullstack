import {
  Product,
  fetchCategories,
  fetchProductsByCategory,
} from '../features/products/productSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const ShopPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const { categories, products } = useAppSelector(state => state.products);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    const quantity = selectedQuantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">רשימת קניות 🛒</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <label className="block font-medium mb-1">בחר קטגוריה:</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              בחר קטגוריה כדי לראות מוצרים
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-3">🧾 עגלת קניות</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">העגלה ריקה</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between border-b pb-1">
                  <span>{item.name}</span>
                  <span>כמות: {item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedCategory && products.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">מוצרים בקטגוריה:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded p-4 shadow-sm">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">₪{product.price.toFixed(2)}</p>

                <div className="flex items-center gap-2 mt-2">
                  <label htmlFor={`qty-${product.id}`} className="text-sm">כמות:</label>
                  <input
                    id={`qty-${product.id}`}
                    type="number"
                    min="1"
                    value={selectedQuantities[product.id] || 1}
                    onChange={(e) =>
                      setSelectedQuantities({
                        ...selectedQuantities,
                        [product.id]: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-16 border rounded p-1 text-center"
                  />
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-3 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                >
                  הוסף לסל
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate('/checkout')}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          המשך להזמנה
        </button>
      </div>
    </div>
  )
}
