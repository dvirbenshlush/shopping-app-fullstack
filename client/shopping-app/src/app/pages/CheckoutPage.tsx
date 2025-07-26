import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.address || !form.email) {
      alert('אנא מלא את כל שדות החובה');
      return;
    }

    const order = {
      customer: form,
      items: cartItems,
    }

    await axios.post('http://localhost:5001/api/orders/confirm', order).then(response => {
      console.log('Order confirmed:', response.data);
      setSubmitted(true);
      dispatch(clearCart());
      setTimeout(() => navigate('/'), 2000);
    }).catch((error) => {
        alert('שגיאה בשליחת ההזמנה');
    })
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">✅ ההזמנה התקבלה</h2>
        <p>תודה על ההזמנה! נחזור אליך במייל.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">טופס הזמנה</h2>

      {/* טופס פרטי הלקוח */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="שם פרטי ומשפחה"
          value={form.fullName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="כתובת מלאה"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="אימייל"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* רשימת מוצרים מהעגלה */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">סיכום ההזמנה:</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">לא נבחרו מוצרים</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between border-b pb-1 text-sm">
                  <span>{item.name}</span>
                  <span>{item.quantity} × ₪{item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          אשר הזמנה
        </button>
      </form>
    </div>
  )
}
