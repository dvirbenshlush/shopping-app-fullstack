import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './cartSlice';
import { useAppSelector, useAppDispatch } from '../../../hooks';

export const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">🛒 עגלת קניות</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">העגלה ריקה</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">₪{item.price.toFixed(2)} ליחידה</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => dispatch(decrementQuantity(item.id))}
                >
                  −
                </button>

                <span className="px-2">{item.quantity}</span>

                <button
                  className="px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => dispatch(incrementQuantity(item.id))}
                >
                  +
                </button>

                <button
                  className="ml-4 text-sm text-gray-500 hover:text-red-600"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  הסר
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
