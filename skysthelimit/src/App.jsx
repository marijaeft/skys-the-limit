import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import NavBar from './components/NavBar.jsx';
import MainBanner from './components/MainBanner.jsx';
import Testimonials from './components/Testimonials.jsx';
import MostPopular from './components/MostPopular.jsx';
import NewCollection from './components/NewCollection.jsx';
import LastChance from './components/LastChance.jsx';
import GiftIdeas from './components/GiftIdeas.jsx';
import Footer from './components/Footer.jsx';
import Cart from './components/Cart.jsx';
import OrderForm from './components/OrderForm.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';
import PlannerDetails from './components/PlannerDetails.jsx';
import DiscountedItems from './components/DiscountedItems.jsx';
import Planners from './components/Planners.jsx';
import BannerTestimonials from './components/BannerTertimonials.jsx';
import BannerTestimonialsValentines from './components/BannerTestimonialsValentines.jsx';
import GiftBox from './components/GiftBox.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Loading from './components/Loading.jsx';

const AboutUs = lazy(() => import('./components/AboutUs.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Delivery = lazy(() => import('./components/Delivery.jsx'));


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BannerTestimonialsValentines />
                <NewCollection />
                <div className='bg-pink-100'> <MostPopular /></div>
                <GiftIdeas />
              </>
            }
          />
          <Route path="/products" element={<Planners />} />
          <Route path="/product/:id" element={<PlannerDetails />} />
          <Route path="/sale" element={<DiscountedItems />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
          <Route path="/gifts" element={<GiftBox />} />
          <Route
            path="/about-us"
            element={
              <Suspense fallback={<Loading />}>
                <AboutUs />
              </Suspense>}
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loading />}>
                <Contact />
              </Suspense>} />
          <Route
            path="/delivery"
            element={
              <Suspense fallback={<Loading />}>
                <Delivery />
              </Suspense>}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
