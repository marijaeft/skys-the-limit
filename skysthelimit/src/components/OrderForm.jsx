import { useMemo, useRef, useState } from 'react';
import { useNavigate, Link, useLang } from '../i18n/routing.jsx';
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
import { priceOrder } from '../data/pricing.js';
import SavingsBadge from './SavingsBadge.jsx';

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
  const { t, lang, money, loc } = useLang();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // the cart is the source of truth (also after a refresh); the email stays in Macedonian
  const cartItems = useMemo(() => itemsFromCart(), []);

  const pricing = priceOrder(cartItems);
  const grandTotal = pricing.total;

  const orderDetails = [
    ...pricing.lines.map(
      (l, index) =>
        `${index + 1}. ${l.title} - Количина: ${l.quantity}, Цена: ${l.total.toFixed(2)} МКД` +
        (l.unit < l.unitBefore ? ` (комбо попуст, ${l.unit} МКД/парче)` : '')
    ),
    ...(pricing.comboDiscount > 0
      ? [`Комбо попуст −${pricing.pct}% (${pricing.count} планери): −${pricing.comboDiscount.toFixed(2)} МКД`]
      : []),
    ...(pricing.savings > 0 ? [`Вкупна заштеда за купувачот: ${pricing.savings.toFixed(2)} МКД`] : []),
    ...(lang === 'en' ? ['Јазик на купувачот: англиски (EN)'] : []),
  ].join('\n');

  const totalPrice = pricing.freeShipping
    ? `${grandTotal.toFixed(2)} МКД (бесплатна достава)`
    : `${grandTotal.toFixed(2)} МКД (вклучува ${DELIVERY_COST} МКД достава)`;

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
      setError(t('order.error'));
      setSending(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 pt-28 pb-20">
        <div className="text-center max-w-md">
          <FiShoppingBag className="mx-auto text-stone-300" size={56} />
          <h1 className="font-serif text-3xl text-stone-900 mt-4">{t('order.emptyTitle')}</h1>
          <p className="text-stone-500 mt-2">{t('order.emptyText')}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 rounded-full bg-navy-950 text-white font-semibold px-6 py-3 hover:bg-navy-900"
          >
            {t('order.toShop')} <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  const Summary = ({ showButton }) => (
    <div className="rounded-3xl bg-white ring-1 ring-stone-200 shadow-sm p-5 sm:p-6">
      <h2 className="font-serif text-2xl text-stone-900 mb-4">{t('order.summaryTitle')}</h2>
      <ul className="space-y-3 max-h-80 overflow-y-auto pt-2 pr-2 -mt-2">
        {pricing.lines.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span className="relative shrink-0">
              <img
                src={item.cardImage || item.images?.[0]}
                alt={loc(item).title}
                className="h-14 w-14 rounded-xl object-cover bg-stone-100"
              />
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-stone-900 px-1 text-[11px] font-bold text-white">
                {item.quantity}
              </span>
            </span>
            <span className="flex-1 min-w-0 text-sm text-stone-800 leading-snug line-clamp-2">{loc(item).title}</span>
            <span className="text-sm font-semibold text-stone-900 whitespace-nowrap">
              {money(item.total)}
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-sm">
        <div className="flex justify-between text-stone-600">
          <dt>{t('cart.products')}</dt>
          <dd>{money(pricing.subtotal)}</dd>
        </div>
        <div className="flex justify-between text-stone-600">
          <dt>{t('cart.delivery')}</dt>
          <dd className={pricing.freeShipping ? 'font-semibold text-emerald-700' : ''}>
            {pricing.freeShipping ? t('cart.free') : money(DELIVERY_COST)}
          </dd>
        </div>
        <div className="flex justify-between items-baseline border-t border-stone-100 pt-3">
          <dt className="font-semibold text-stone-900">{t('cart.total')}</dt>
          <dd className="text-2xl font-bold text-stone-900">{money(grandTotal)}</dd>
        </div>
      </dl>
      <SavingsBadge pricing={pricing} className="mt-4" />
      <p className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 text-emerald-800 text-sm px-3 py-2">
        <FiTruck className="shrink-0" /> {t('cart.payOnDelivery')}
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
          {t('order.sending')}
        </>
      ) : (
        <>
          <span className="shine-loop" />
          {t('order.confirm')}
          <FiArrowRight className="arrow-nudge text-amber-300" />
        </>
      )}
    </button>
  );

  return (
    <div className="flex-1 bg-[#f6f4f1] px-4 sm:px-6 pt-28 sm:pt-32 pb-32 lg:pb-20">
      <div className="max-w-6xl mx-auto">
        <CheckoutSteps current={1} />
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900">{t('order.title')}</h1>
          <p className="text-stone-600 mt-2">{t('order.subtitle')}</p>
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
            <Section n={1} title={t('order.s1')}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t('order.firstName')} icon={FiUser} required>
                  <input type="text" name="firstName" required autoComplete="given-name" placeholder={t('order.firstNamePh')} className={inputCls} />
                </Field>
                <Field label={t('order.lastName')} icon={FiUser} required>
                  <input type="text" name="lastName" required autoComplete="family-name" placeholder={t('order.lastNamePh')} className={inputCls} />
                </Field>
                <Field label={t('order.email')} icon={FiMail} required hint={t('order.emailHint')}>
                  <input type="email" name="email" required autoComplete="email" inputMode="email" placeholder={t('order.emailPh')} className={inputCls} />
                </Field>
                <Field label={t('order.phone')} icon={FiPhone} required hint={t('order.phoneHint')}>
                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+ ]{6,}"
                    title={t('order.phoneTitle')}
                    placeholder={t('order.phonePh')}
                    className={inputCls}
                  />
                </Field>
              </div>
            </Section>

            <Section n={2} title={t('order.s2')}>
              <div className="grid sm:grid-cols-[2fr_1fr] gap-4">
                <Field label={t('order.address')} icon={FiHome} required>
                  <input type="text" name="address" required autoComplete="street-address" placeholder={t('order.addressPh')} className={inputCls} />
                </Field>
                <Field label={t('order.city')} icon={FiMapPin} required>
                  <input type="text" name="city" required autoComplete="address-level2" placeholder={t('order.cityPh')} className={inputCls} />
                </Field>
              </div>
            </Section>

            <Section n={3} title={t('order.s3')}>
              <Field label={t('order.notes')} icon={FiMessageSquare} hint={t('order.notesHint')}>
                <textarea name="additionalInfo" rows="4" placeholder={t('order.notesPh')} className={`${inputCls} resize-none`} />
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
                <FiArrowLeft /> {t('order.back')}
              </Link>
              <span className="flex items-center gap-1.5 text-xs text-stone-500">
                <FiLock /> {t('order.privacy')}
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* sticky submit bar on mobile/tablet */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <div className="shrink-0">
            <p className="text-xs text-stone-500">{t('cart.total')}</p>
            <p className="text-lg font-bold text-stone-900">{money(grandTotal)}</p>
          </div>
          <SubmitButton className="flex-1 py-3.5 text-base" />
        </div>
      </div>
    </div>
  );
}
