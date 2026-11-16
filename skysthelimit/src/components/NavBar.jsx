import React, { useEffect, useState } from 'react';
import logo_skys from '../assets/logo_skys.webp';
import { FiShoppingBag, FiMenu, FiX, FiCheckCircle } from 'react-icons/fi';
import { getCart } from '../data/Cart.js';
import { useLocation } from 'react-router-dom';
import { Link, NavLink, useLang } from '../i18n/routing.jsx';
import { stripLang } from '../i18n/index.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';

// pages where the "added to cart" toast is not shown (the page shows it itself)
const NO_TOAST = ['/gifts'];

const links = [
  { to: '/products', key: 'nav.planners' },
  { to: '/cards', key: 'nav.cards' },
  { to: '/sale', key: 'nav.sale' },
  { to: '/gifts', key: 'nav.combo' },
];

function NavBar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { pathname } = useLocation();
  const { t } = useLang();

  const updateCartCount = () => {
    const cart = getCart();
    const totalCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    if (totalCount > cartCount && !NO_TOAST.includes(stripLang(pathname))) {
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
  }, [cartCount, pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-stone-200/70">
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

        <ul className="hidden md:flex md:gap-10 text-[15px] font-medium tracking-wide">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `relative py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-amber-600 after:transition-all after:duration-300 ${
                    isActive ? 'text-navy-950 after:w-full' : 'text-stone-600 hover:text-navy-950 after:w-0 hover:after:w-full'
                  }`
                }
              >
                {t(l.key)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-navy-950">
          <LanguageSwitcher className="hidden md:inline-flex mr-2" />
          <Link to="/cart" aria-label={t('nav.cart')} className="relative p-2 rounded-full hover:bg-stone-100 transition">
            <FiShoppingBag size={24} />
            {cartCount > 0 && (
              <span key={cartCount} className="bump absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-rose-500 text-white text-[11px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="md:hidden p-2 rounded-full hover:bg-stone-100 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t('nav.menu')}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul className="md:hidden flex flex-col px-6 pb-4 pt-1 border-t border-stone-200/70 bg-white font-medium text-stone-700">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} onClick={() => setMenuOpen(false)} className="block py-3 border-b border-stone-100 hover:text-navy-950">
                {t(l.key)}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <LanguageSwitcher onSwitch={() => setMenuOpen(false)} />
          </li>
        </ul>
      )}

      {showNotification && (
        <Link to="/cart">
          <div className="fixed bottom-6 right-6 left-6 sm:left-auto flex items-center gap-3 bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-toast-in">
            <FiCheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
            <span className="text-sm">{t('nav.added')}</span>
            <span className="text-sm font-semibold text-amber-300 ml-auto pl-2">{t('nav.view')}</span>
          </div>
        </Link>
      )}
    </nav>
  );
}

export default NavBar;