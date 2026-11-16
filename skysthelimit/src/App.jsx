import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import NavBar from './components/NavBar.jsx';
import MostPopular from './components/MostPopular.jsx';
import NewCollection from './components/NewCollection.jsx';
import GiftIdeas from './components/GiftIdeas.jsx';
import Footer from './components/Footer.jsx';
import Cart from './components/Cart.jsx';
import OrderForm from './components/OrderForm.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';
import PlannerDetails from './components/PlannerDetails.jsx';
import DiscountedItems from './components/DiscountedItems.jsx';
import Planners from './components/Planners.jsx';
import BannerTestimonials from './components/BannerTertimonials.jsx';
import GiftBox from './components/GiftBox.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Loading from './components/Loading.jsx';
import Cards from './components/Cards.jsx';
import CardDetails from './components/CardDetails.jsx';
import LangSync from './i18n/LangSync.jsx';

const AboutUs = lazy(() => import('./components/AboutUs.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Delivery = lazy(() => import('./components/Delivery.jsx'));

function PageFade({ children }) {
  const { pathname } = useLocation();
  // re-mount the page when the path or the language changes (e.g. back/forward between languages)
  const { i18n } = useTranslation();
  return (
    <div key={`${i18n.language}:${pathname}`} className="page-in flex-1 flex flex-col w-full min-w-0">
      {children}
    </div>
  );
}

const lazyPage = (page) => <Suspense fallback={<Loading />}>{page}</Suspense>;

// Every page exists twice: Macedonian at "/..." and English at "/en/...".
const pageRoutes = (
  <>
    <Route
      index
      element={
        <>
          <BannerTestimonials />
          <NewCollection />
          <div className="bg-[#cdd0d6] flow-root">
            <MostPopular />
            <GiftIdeas />
          </div>
        </>
      }
    />
    <Route path="products" element={<Planners />} />
    <Route path="product/:id" element={<PlannerDetails />} />
    <Route path="cards" element={<Cards />} />
    <Route path="card/:id" element={<CardDetails />} />
    <Route path="sale" element={<DiscountedItems />} />
    <Route path="cart" element={<Cart />} />
    <Route path="order" element={<OrderForm />} />
    <Route path="confirmation" element={<OrderConfirmation />} />
    <Route path="gifts" element={<GiftBox />} />
    <Route path="about-us" element={lazyPage(<AboutUs />)} />
    <Route path="contact" element={lazyPage(<Contact />)} />
    <Route path="delivery" element={lazyPage(<Delivery />)} />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <LangSync />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <NavBar />
        <PageFade>
          <Routes>
            <Route path="/en">{pageRoutes}</Route>
            <Route path="/">{pageRoutes}</Route>
          </Routes>
        </PageFade>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
