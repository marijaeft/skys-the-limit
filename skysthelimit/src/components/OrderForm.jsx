import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiHome, FiMessageSquare,
  FiLock, FiTruck, FiArrowRight, FiArrowLeft, FiShoppingBag,
} from 'react-icons/fi';
import { DELIVERY_COST } from '../data/delivery.js';
import { getCart } from '../data/Cart.js';
import planners from '../data/planners-data.js';
import gifts from '../data/Combo.js';
import cards from '../data/cards-data.js';
import CheckoutSteps from './CheckoutSteps.jsx';

const toNumber = (price) => parseInt(String(price).replace(/\D/g, ''), 10) || 0;
const unit = (item) => toNumber(item.sale ? item.discountedPrice : item.price);

// fall back to the saved cart if the page was refreshed (router state is lost)
function itemsFromCart() {
  const cart = getCart();
  return [...planners, ...gifts, ...cards]
    .filter((p) => cart[p.id])
    .map((p) => ({ ...p, quantity: cart[p.id] }));
}

function Field({ label, icon: Icon, required, hint, className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className="flex items-center gap-1 text-sm font-semibold text-stone-800 mb-1.5">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </span>
      <span className="relative block">
        {Icon && (
          <span className="pointer-events-none absolute left-4 top-[1.05rem] text-stone-400">
            {Icon({ size: 18 })}
          </span>
        )}
        {children}
      </span>
      {hint && <span className="block text-xs text-stone-500 mt-1.5">{hint}</span>}
    </label>
  );
}

const inputCls =
  'w-full rounded-2xl border border-stone-300 bg-white pl-11 pr-4 py-3.5 text-base text-stone-900 placeholder:text-stone-400 ' +
  'shadow-sm transition focus:border-navy-900 focus:outline-none focus:ring-4 focus:ring-navy-900/10';

function Section({ n, title, children }) {
  return (
    <section className="rounded-3xl bg-white ring-1 ring-stone-200 shadow-sm p-5 sm:p-7">
      <h2 className="flex items-center gap-3 font-serif text-2xl text-stone-900 mb-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 text-white font-sans text-sm font-bold">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function OrderForm() {
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const cartItems = useMemo(
    () => (location.state?.cartItems?.length ? location.state.cartItems : itemsFromCart()),
    [location.state]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + unit(item) * item.quantity, 0);
  const grandTotal = subtotal + DELIVERY_COST;

  const orderDetails = cartItems
    .map((item, index) => {
      const total = unit(item) * item.quantity;
      return `${index + 1}. ${item.title} - Количина: ${item.quantity}, Цена: ${total.toFixed(2)} МКД`;
    })
    .join('\n');

  const totalPrice = `${grandTotal.toFixed(2)} МКД (вклучува ${DELIVERY_COST} МКД достава)`;

  const timeDate = new Date().toLocaleString('mk-MK', { dateStyle: 'short', timeStyle: 'short' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');
    try {
      await emailjs.sendForm('service_1c9ypsb', 'template_90ktaje', formRef.current, 'YxI5mOqEzj8au1gsd');
      navigate('/confirmation');
    } catch {
      setError('Имаше проблем при испраќањето на нарачката. Ве молиме обидете се повторно.');
      setSending(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 pt-28 pb-20">
        <div className="text-center max-w-md">
          <FiShoppingBag className="mx-auto text-stone-300" size={56} />
          <h1 className="font-serif text-3xl text-stone-900 mt-4">Кошничката е празна</h1>
          <p className="text-stone-500 mt-2">Додајте производи пред да ја завршите нарачката.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 rounded-full bg-navy-950 text-white font-semibold px-6 py-3 hover:bg-navy-900"
          >
            Кон продавницата <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  const Summary = ({ showButton }) => (
    <div className="rounded-3xl bg-white ring-1 ring-stone-200 shadow-sm p-5 sm:p-6">
      <h2 className="font-serif text-2xl text-stone-900 mb-4">Вашата нарачка</h2>
      <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span className="relative shrink-0">
              <img
                src={item.cardImage || item.images?.[0]}
                alt={item.title}
                className="h-14 w-14 rounded-xl object-cover bg-stone-100"
              />
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-stone-900 px-1 text-[11px] font-bold text-white">
                {item.quantity}
              </span>
            </span>
            <span className="flex-1 min-w-0 text-sm text-stone-800 leading-snug line-clamp-2">{item.title}</span>
            <span className="text-sm font-semibold text-stone-900 whitespace-nowrap">
              {(unit(item) * item.quantity).toLocaleString('mk-MK')} ден
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-sm">
        <div className="flex justify-between text-stone-600">
          <dt>Производи</dt>
          <dd>{subtotal.toLocaleString('mk-MK')} ден</dd>
        </div>
        <div className="flex justify-between text-stone-600">
          <dt>Достава</dt>
          <dd>{DELIVERY_COST} ден</dd>
        </div>
        <div className="flex justify-between items-baseline border-t border-stone-100 pt-3">
          <dt className="font-semibold text-stone-900">Вкупно</dt>
          <dd className="text-2xl font-bold text-stone-900">{grandTotal.toLocaleString('mk-MK')} ден</dd>
        </div>
      </dl>
      <p className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 text-emerald-800 text-sm px-3 py-2">
        <FiTruck className="shrink-0" /> Плаќање во готово при достава
      </p>
      {showButton && <SubmitButton className="mt-5 hidden lg:flex" />}
    </div>
  );

  const SubmitButton = ({ className = '' }) => (
    <button
      type="submit"
      form="order-form"
      disabled={sending}
      className={`group relative w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-navy-950 via-navy-700 to-navy-950 bg-[length:200%_100%] bg-left hover:bg-right px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-navy-950/25 transition-all duration-500 active:scale-[0.98] disabled:opacity-70 flex ${className}`}
    >
      {sending ? (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Се испраќа…
        </>
      ) : (
        <>
          Потврди нарачка
          <FiArrowRight className="text-amber-300 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );

  return (
    <div className="flex-1 bg-[#f6f4f1] px-4 sm:px-6 pt-28 sm:pt-32 pb-32 lg:pb-20">
      <div className="max-w-6xl mx-auto">
        <CheckoutSteps current={1} />
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900">Податоци за нарачка</h1>
          <p className="text-stone-600 mt-2">Уште само еден чекор – пополнете ги податоците за достава.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* summary first on mobile so they see what they are ordering */}
          <div className="lg:order-2 lg:sticky lg:top-28">
            <Summary showButton />
          </div>

          <form
            id="order-form"
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:order-1 space-y-5"
          >
            <Section n={1} title="Ваши податоци">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Име" icon={FiUser} required>
                  <input type="text" name="firstName" required autoComplete="given-name" placeholder="Ана" className={inputCls} />
                </Field>
                <Field label="Презиме" icon={FiUser} required>
                  <input type="text" name="lastName" required autoComplete="family-name" placeholder="Николовска" className={inputCls} />
                </Field>
                <Field label="Email адреса" icon={FiMail} required hint="Тука ќе ја добиете потврдата за нарачката.">
                  <input type="email" name="email" required autoComplete="email" inputMode="email" placeholder="ime@primer.com" className={inputCls} />
                </Field>
                <Field label="Телефон" icon={FiPhone} required hint="Курирот ќе ве контактира на овој број.">
                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+ ]{6,}"
                    title="Внесете важечки телефонски број"
                    placeholder="07X XXX XXX"
                    className={inputCls}
                  />
                </Field>
              </div>
            </Section>

            <Section n={2} title="Адреса за достава">
              <div className="grid sm:grid-cols-[2fr_1fr] gap-4">
                <Field label="Адреса" icon={FiHome} required>
                  <input type="text" name="address" required autoComplete="street-address" placeholder="Улица и број, стан" className={inputCls} />
                </Field>
                <Field label="Град" icon={FiMapPin} required>
                  <input type="text" name="city" required autoComplete="address-level2" placeholder="Скопје" className={inputCls} />
                </Field>
              </div>
            </Section>

            <Section n={3} title="Забелешка">
              <Field label="Дополнителни информации" icon={FiMessageSquare} hint="Незадолжително – пр. порака за честитката, време за достава…">
                <textarea name="additionalInfo" rows="4" placeholder="Напишете ни ако имате посебно барање" className={`${inputCls} resize-none`} />
              </Field>
            </Section>

            <input type="hidden" name="order_details" value={orderDetails} />
            <input type="hidden" name="total_price" value={totalPrice} />
            <input type="hidden" name="time_date" value={timeDate} />

            {error && (
              <p role="alert" className="rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-200 px-4 py-3 text-sm">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between gap-4">
              <Link to="/cart" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm font-medium">
                <FiArrowLeft /> Назад во кошничка
              </Link>
              <span className="flex items-center gap-1.5 text-xs text-stone-500">
                <FiLock /> Податоците се користат само за достава
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* sticky submit bar on mobile/tablet */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <div className="shrink-0">
            <p className="text-xs text-stone-500">Вкупно</p>
            <p className="text-lg font-bold text-stone-900">{grandTotal.toLocaleString('mk-MK')} ден</p>
          </div>
          <SubmitButton className="flex-1 py-3.5 text-base" />
        </div>
      </div>
    </div>
  );
}
