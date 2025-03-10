import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer } from "react-toastify"
import Login from './components/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from "react-router-dom"
import AddProducts from './pages/AddProducts'
import AllProducts from './pages/AllProducts'
import Orders from './pages/Orders'
import AllUsers from './pages/AllUsers'
import SingleUser from './pages/SingleUser'
import SingleProduct from './pages/SingleProduct'
import Dashboard from './pages/Dashboard'
import Banners from './pages/Banners'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "Rs."

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {
        token === ""
        ?
          <Login setToken={setToken} />
        :
          <>
            <Navbar setToken={setToken} setIsMobileOpen={setIsMobileOpen} />
            <hr />
            <div className="flex flex-grow bg-[#F2F3F8]">
              <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
              <main className="w-[85%] md:w-[70%] mx-auto md:ml-[20rem] 3xl:ml-[30rem] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path='/' element={ <Dashboard /> } />
                  <Route path='/add' element={ <AddProducts /> } />
                  <Route path='/list' element={<AllProducts />} />
                  <Route path='/order' element={<Orders />} />
                  <Route path='/users' element={ <AllUsers /> } />
                  <Route path='/user/:userId' element={ <SingleUser /> } />
                  <Route path='/product/:productId' element={ <SingleProduct /> } />
                  <Route path='/banner' element={ <Banners /> } />
                </Routes>
              </main>
            </div>
          </>
      }
    </div>
  )
}

export default App