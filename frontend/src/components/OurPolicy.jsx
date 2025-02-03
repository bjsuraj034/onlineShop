import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col gap-12 sm:gap-2 py-20  sm:flex-row justify-around text-center text-sm sm:text-sm md:text-base text-gray-400'>
        <div>
            <img src={assets.exchange} alt="" className='w-11 m-auto'/>
            <h1 className='font-extrabold text-gray-800'>Easy Exchange Policy</h1>
            <p>We offer best free exchange policy</p>
        </div>
        <div>
            <img src={assets.returnback} alt="" className='w-11 m-auto'/>
            <h1 className='font-extrabold text-gray-800'>7 Days return policy</h1>
            <p>We offer 7 days free return policy</p>
        </div>
        <div>
            <img src={assets.customersupport} alt="" className='w-11 m-auto'/>
            <h1 className='font-extrabold text-gray-800'>Best customer service</h1>
            <p>We offer best free exchange policy</p>
        </div>
    </div>
  )
}

export default OurPolicy