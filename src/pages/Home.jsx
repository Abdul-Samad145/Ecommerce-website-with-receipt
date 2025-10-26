import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { addToCart } = useCart();

  const carouselImages = [
    "/pic.png",
    "/pic2.jpg",
    "/pic3.jpg",
    "/pic4.jpg",
    "/pic5.jpg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const productsWithDiscount = data.map(p => ({
          ...p,
          discount: Math.random() < 0.4 ? 10 : 0
        }));
        setProducts(productsWithDiscount);
        setFilteredProducts(productsWithDiscount);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let temp = products;
    if (filter === "1-50") temp = temp.filter(p => p.price >= 1 && p.price <= 50);
    if (filter === "50-100") temp = temp.filter(p => p.price > 50 && p.price <= 100);
    if (filter === "100-200") temp = temp.filter(p => p.price > 100 && p.price <= 200);
    if (filter === "200+") temp = temp.filter(p => p.price > 200);
    if (searchTerm) temp = temp.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredProducts(temp);
  }, [filter, searchTerm, products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
        <img
          src={carouselImages[currentSlide]}
          alt="Carousel"
          className="w-full h-56 md:h-80 object-cover transition duration-500 ease-in-out"
        />
        <div className="absolute bottom-4 left-4 text-white text-xl font-semibold bg-indigo-600 px-3 py-1 rounded-md shadow-md">
          Mega Sale!
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Product Store</h1>

      <div className="flex justify-center mb-6 flex-wrap gap-3">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="all">All Prices</option>
          <option value="1-50">$1 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200+">$200+</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
              discount={product.discount}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
}
