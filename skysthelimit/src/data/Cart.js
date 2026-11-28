import planners from './planners-data.js';
import gifts from './Combo.js';

const CART_KEY = 'cart';
export const MAX_QTY = 100;

// products that can't be bought right now (soldOut: true in the data)
const SOLD_OUT = new Set([...planners, ...gifts].filter((p) => p.soldOut).map((p) => String(p.id)));
export const isSoldOut = (id) => SOLD_OUT.has(String(id));

export function getCart() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || {};
  // drop sold-out products that were added before they sold out
  for (const id of Object.keys(cart)) if (isSoldOut(id)) delete cart[id];
  return cart;
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
}

export function addToCart(productId) {
  if (isSoldOut(productId)) return;
  const cart = getCart();
  cart[productId] = Math.min(MAX_QTY, (cart[productId] || 0) + 1);
  saveCart(cart);
}

export function setQuantity(productId, qty) {
  if (isSoldOut(productId)) return;
  const cart = getCart();
  const n = Math.max(1, Math.min(MAX_QTY, Math.floor(Number(qty)) || 1));
  cart[productId] = n;
  saveCart(cart);
}

export function removeOneFromCart(productId) {
  const cart = getCart();
  if (!cart[productId]) return;
  cart[productId] -= 1;
  if (cart[productId] <= 0) {
    delete cart[productId];
  }
  saveCart(cart);
}

export function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cartUpdated'));
}
