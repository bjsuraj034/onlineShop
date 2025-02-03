import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Orders from './pages/Orders'
import Products from './pages/Product'
import About from './pages/About'
import PlaceOrders from './pages/PlaceOrders'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetails from './pages/OrderDetails'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <Searchbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/product/:productId' element={<Products/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/place-orders' element={<PlaceOrders/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/order/:id" element={<OrderDetails />}/>

      </Routes>
      <Footer/>

    </div>
  )
}

export default App