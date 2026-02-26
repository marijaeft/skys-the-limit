import React, { useState, useEffect } from 'react';
import { getCart, addToCart, removeOneFromCart, removeFromCart } from '../data/Cart.js';
import planners from '../data/planners-data.js';
import cards from '../data/cards-data.js';
import { useNavigate } from 'react-router-dom';
import gifts from '../data/Combo.js';

export default function Cart() {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  useEffect(() => {
    const onCartUpdated = () => setCart(getCart());
    window.addEventListener('cartUpdated', onCartUpdated);
    return () => window.removeEventListener('cartUpdated', onCartUpdated);
  }, []);

  if (Object.keys(cart).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293a1 1 0 00.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          <h2 className="mt-4 text-2xl font-semibold text-gray-700">
            Вашата кошничка е празна
          </h2>
          <p className="mt-2 text-gray-500">
            Изгледа дека сè уште не сте додале производи.
          </p>

          <button
            onClick={() => navigate('/products')}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-white text-lg font-medium rounded-xl shadow hover:shadow-lg transition-all"
          >
            🛒 Продолжи со купување
          </button>
        </div>
      </div>
    );
  }

  const allProducts = [...planners, ...gifts, ...cards];

  const cartItems = allProducts
    .filter(p => cart[p.id])
    .map(p => {
      const price = p.sale
        ? parseFloat(p.discountedPrice.replace(/\D/g, ""))
        : parseFloat(p.price.replace(/\D/g, ""));
      return {
        ...p,
        quantity: cart[p.id],
        displayPrice: price,
        totalPrice: price * cart[p.id],
      };
    });

  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryCost = 150;
  const finalTotal = totalCartPrice + deliveryCost;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 italic">Вашата кошничка</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-col sm:flex-row gap-4 items-center"
        >
          <img
            src={item.cardImage || item.images?.[0]}
            alt={item.title}
            className="w-24 h-24 object-cover rounded-md"
          />

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-yellow-500">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.subtitle}</p>

            {item.sale ? (
              <p className="mt-1 text-gray-600">
                <span className="line-through text-gray-400 mr-2">
                  {parseFloat(item.price.replace(/\D/g, "")).toFixed(2)} ден
                </span>
                <span className="text-red-500 font-semibold">
                  {item.displayPrice.toFixed(2)} ден
                </span>
              </p>
            ) : (
              <p className="mt-1 text-gray-600">
                {item.displayPrice.toFixed(2)} ден
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
            <button
              onClick={() => removeOneFromCart(item.id)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
            >
              -
            </button>

            <span className="text-lg font-medium text-gray-700">{item.quantity}</span>

            <button
              onClick={() => addToCart(item.id)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
            >
              +
            </button>

            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Избриши
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-6 space-y-2">
        <p className="text-md text-gray-600">Цена: {totalCartPrice.toFixed(2)} ден</p>
        <p className="text-md text-gray-600">Достава: {deliveryCost} ден</p>
        <p className="text-xl font-bold text-gray-800 border-t pt-2">
          Вкупно за плаќање: {finalTotal.toFixed(2)} ден <br />(се плаќа при достава)
        </p>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/order', { state: { cartItems } })}
          className="bg-white hover:shadow-lg font-light text-neutral-900 tracking-tight text-2xl px-6 py-3 rounded-lg shadow transition border border-yellow-400 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 "
        >
          Завршете ја вашата нарачка
        </button>
      </div>
    </div>
  );
}