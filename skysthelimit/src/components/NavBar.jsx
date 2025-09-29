import React, { useEffect, useState } from 'react';
import logo_skys from '../assets/logo_skys.webp';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { getCart } from '../data/Cart.js';
import { Link } from 'react-router-dom';

function NavBar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const updateCartCount = () => {
    const cart = getCart();
    const totalCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    if (totalCount > cartCount) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }

    setCartCount(totalCount);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('storage', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, [cartCount]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
      <div className="flex justify-between items-center px-6 md:px-16 py-2">
        <Link to="/">
          <div>
            <img
              src={logo_skys}
              className="w-[200px] md:w-[300px] h-auto"
              alt="Sky's The Limit Logo"
            />
          </div>
        </Link>

        <ul className="hidden md:flex md:space-x-16 font-medium text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
            <li><Link to="/products" className="hover:font-bold">Планери</Link></li>
            <li><Link to="/sale" className="hover:font-bold">Попусти</Link></li>
            <li><Link to="/gifts" className="hover:font-bold">Комбо</Link></li>
        </ul>

        <div className="flex items-center space-x-4 text-yellow-300">
          <Link to="/cart">
            <div className="relative">
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-yellow-900 text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
          <div className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {menuOpen && (
        <ul className="md:hidden flex flex-col items-start pl-9 bg-white shadow-md py-2 space-y-2 font-medium text-l text-yellow-600">
          <li><Link to="/products" onClick={() => setMenuOpen(false)} className="hover:font-bold">Планери</Link></li>
          <li><Link to="/sale" onClick={() => setMenuOpen(false)} className="hover:font-bold">Попусти</Link></li>
          <li><Link to="/gifts" onClick={() => setMenuOpen(false)} className="hover:font-bold">Комбо</Link></li>
        </ul>
      )}

      {showNotification && (
        <Link to="/cart">
          <div className="fixed bottom-6 right-6 bg-green-600 text-gray-100 px-4 py-2 rounded-lg shadow-lg animate-bounce">
            Успешно додаден производ во кошничка.
          </div>
        </Link>
      )}
    </nav>
  );
}

export default NavBar;
