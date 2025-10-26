import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header({ onSearch }) {
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 tracking-tight hover:text-indigo-800 transition"
        >
       <img src="/logo.png" alt="ShopEase" className="h-4 w-auto" /> ShopEase
        </Link>

        <div className="flex-1 mx-4 hidden md:flex">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link to="/checkout" className="hover:text-indigo-600 transition">Checkout</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 transition">
           <img src="cart.webp" alt="cart" className="h-6 w-auto" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className="md:hidden text-gray-700 hover:text-indigo-600 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 flex flex-col gap-2">
          <Link to="/" className="hover:text-indigo-600 transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/checkout" className="hover:text-indigo-600 transition" onClick={() => setMobileMenuOpen(false)}>Checkout</Link>
        </div>
      )}
    </header>
  );
}
