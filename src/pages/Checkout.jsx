import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Receipt from "../components/Receipt";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentImage: null,
  });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const orderCopy = [...cart];
    setReceiptOrder(orderCopy);
    setShowReceipt(true);
    clearCart();
  };

  if (cart.length === 0 && !showReceipt) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No items to checkout</h2>
        <p className="text-gray-500">Add some products to your cart to continue.</p>
      </div>
    );
  }

  if (showReceipt) {
    return <Receipt order={receiptOrder} customer={formData} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Checkout</h2>
        <div className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Complete Address"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="ZIP"
              required
              className="w-full sm:w-32 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 hover:border-indigo-400 transition">
            <label className="block text-gray-600 text-sm mb-2 font-medium">
              Upload Payment Screenshot
            </label>
            <input
              type="file"
              name="paymentImage"
              accept="image/*"
              required
              onChange={handleChange}
              className="w-full text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300"
        >
          Place Order
        </button>
      </form>

      <aside className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Order Summary</h3>
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => {
            const qty = Number(item.qty ?? item.quantity) || 0;
            const price = Number(item.price) || 0;
            return (
              <li key={item.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-14 w-14 object-contain rounded-lg border border-gray-100"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 truncate w-36 sm:w-48">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {qty} × ${price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-gray-700">
                  ${(price * qty).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 border-t pt-4 flex justify-between font-bold text-lg text-gray-800">
          <span>Total</span>
          <span>
            $
            {cart
              .reduce(
                (s, i) => s + Number(i.price) * Number(i.qty ?? i.quantity),
                0
              )
              .toFixed(2)}
          </span>
        </div>
      </aside>
    </div>
  );
}
