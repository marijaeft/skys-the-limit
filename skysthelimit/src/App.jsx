import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import MainBanner from './components/MainBanner.jsx';
import Testimonials from './components/Testimonials.jsx';
import MostPopular from './components/MostPopular.jsx';
import LastChance from './components/LastChance.jsx';
import GiftIdeas from './components/GiftIdeas.jsx';
import Footer from './components/Footer.jsx';
import Cart from './components/Cart.jsx';
import OrderForm from './components/OrderForm.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';
import PlannerDetails from './components/PlannerDetails.jsx';
import DiscountedItems from './components/DiscountedItems.jsx';
import Planners from './components/Planners.jsx';
import { BannerTestimonials } from './components/BannerTertimonials.jsx';
import { GiftBox } from './components/GiftBox.jsx';
import { AboutUs } from './components/AboutUs.jsx';
import { Contact } from './components/Contact.jsx';
import { Delivery } from './components/Delivery.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BannerTestimonials />
              <MostPopular />
              <LastChance />
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
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
       <Footer />
       </div>
    </BrowserRouter>
  );
}

export default App;
