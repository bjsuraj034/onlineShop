import React from 'react'
import { assets } from '../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location=useLocation();
  return (
    <div>
      <div className='mt-40  grid grid-col-1 sm:grid-cols-[3fr_1fr_1fr] gap-[50px]'>
        
      <div className='flex flex-col gap-2 sm:gap-5 p-2  '>
        <img src={assets.logo} alt="" className='w-32' />
        <p className='text-gray-600 font-medium text-sm sm:text-[16px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla laborum odio assumenda, impedit nostrum consequatur quis sequi inventore laboriosam harum?</p>
      </div>
      <div className='flex flex-col leading-tight gap-1 text-gray-500 p-2'>
        <h2 className='mb-5 sm:mb-7 text-gray-800 font-bold uppercase text-xl'>Company</h2>
        <Link to='/'>
        <p className={`${location.pathname==='/' ? "text-gray-950 underline" : "text-gray-700"} uppercase`}> home</p>
      
        </Link>
        <Link to='/collection'>
         <p className={`${location.pathname==='/collection' ? "text-gray-950 underline" : "text-gray-700"} uppercase`}>Collection</p>
        </Link>
        <Link to='/about'>
         <p className={`${location.pathname==='/about' ? "text-gray-950 underline" : "text-gray-700"} uppercase`}>About</p>
        </Link>
        <Link to='/contact'>
         <p className={`${location.pathname==='/contact' ? "text-gray-950 underline" : "text-gray-700"} uppercase`}>Contact</p>
        </Link>
      </div>
      <div className='flex flex-col p-2 text-gray-600'>
        <h2 className='uppercase mb-4 sm:mb-5 lg:mb-8 text-gray-800 font-extrabold text-xl'>Get in touch</h2>
        <p className='underline'>+977 9843979884</p>
        <p className='underline'>itsmesuraj034@gmail.com</p>
        <Link to={'https://www.instagram.com/surajpandey1287/?hl=en'} className='underline'>
        <p>Instagram</p>
        </Link>
      </div>
      </div>
      <div className=' text-center'>
        <hr/>
        <p className='py-2 sm:py-4 text-xs sm:text-[17px] font-semibold text-gray-700'>@copyright  2024@surajpandey.dev-All right Reserved</p>

      </div>
    </div>
    

  )
}

export default Footer