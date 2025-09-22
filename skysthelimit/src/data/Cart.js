const CART_KEY = 'cart';

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || {};
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
}

export function addToCart(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
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
