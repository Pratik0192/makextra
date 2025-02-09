import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TopOffers from './components/TopOffers'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Collections from './pages/Collections'
import SingleProduct from './pages/SingleProduct'
import OrderTrack from './pages/OrderTrack'
import CancelOrder from './pages/CancelOrder'
import ExchangeOrder from './pages/ExchangeOrder'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import PrivacyPolicy from './components/PrivacyPolicy'
import ReturnPolicy from './pages/ReturnPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import Service from './components/Service'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <TopOffers />
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/products' element={ <Products /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/collections' element={ <Collections /> } />
        <Route path='/product/:productId' element={ <SingleProduct /> } />
        <Route path='/track-order' element={ <OrderTrack /> } />
        <Route path='/cancel' element={ <CancelOrder /> } />
        <Route path='/exchange-order' element={ <ExchangeOrder /> } />
        <Route path='/contact' element={ <ContactUs /> } />
        <Route path='/about' element={ <AboutUs /> } />
        <Route path='/privacy' element={ <PrivacyPolicy /> } />
        <Route path='/retund' element={ <ReturnPolicy/> } />
        <Route path='/shipping' element={ <ShippingPolicy /> } />
        <Route path='/service' element={ <Service /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App