import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

export default function OrderForm() {
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];

  const orderDetails = cartItems
    .map((item, index) => {
      const price = item.sale ? parseFloat(item.discountedPrice) : parseFloat(item.price);
      const total = price * item.quantity;
      return `${index + 1}. ${item.title} - Количина: ${item.quantity}, Цена: ${total.toFixed(2)} МКД`;
    })
    .join('\n');

  const totalPrice = (
    cartItems.reduce((sum, item) => {
      const price = item.sale ? parseFloat(item.discountedPrice) : parseFloat(item.price);
      return sum + price * item.quantity;
    }, 0) + 150
  ).toFixed(2) + ' МКД (вклучува 150 МКД достава)';

  const timeDate = new Date().toLocaleString('mk-MK', {
    dateStyle: 'short',
    timeStyle: 'short',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        'service_1c9ypsb',
        'template_90ktaje',
        formRef.current,
        'YxI5mOqEzj8au1gsd'
      );

      navigate('/confirmation');
      console.log('Email sent');
    } catch (err) {
      alert('Имаше проблем во испраќањето на е-поштата. Пробајте повторно.');
    }
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-6">
      <div className="w-full max-w-5xl">
        <div className="bg-white shadow-2xl rounded-3xl p-10 mx-auto">
          <h2 className="text-3xl font-light text-yellow-500 mb-10 text-center">
            Податоци за нарачка
          </h2>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Име</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Презиме</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email адреса</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Адреса</label>
              <input
                type="text"
                name="address"
                required
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Град</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  pattern="\d+"
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Дополнителни информации</label>
              <textarea
                name="additionalInfo"
                rows="4"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>

            <input type="hidden" name="order_details" value={orderDetails} />
            <input type="hidden" name="total_price" value={totalPrice} />
            <input type="hidden" name="time_date" value={timeDate} />

            <div className="pt-8 text-center">
              <button
                type="submit"
                className="w-full sm:w-1/2 lg:w-1/3 mx-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-xl shadow-md transition duration-300"
              >
                Потврди нарачка
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
