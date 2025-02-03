import React from 'react'
import {assets} from '../assets/assets'
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* {hero ko left section} */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 '>
        <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='uppercase font-semibold md:text-base'>Welcome to our store</p> 
            </div>
            <h1 className='text-3xl  lg:text-6xl leading-relaxed'>Latest <span className='font-extrabold text-green-700'>arrival</span></h1>
            <div className='flex items-center gap-2'>
                <p className='uppercase font-semi md:text-base font-semibold'>Shop now</p>
                <p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>

            </div>
        </div>

        </div>
        {/* {hero ko right photo wala section} */}
          <img src={assets.heroimage} alt="" className='sm:w-1/2' />

    </div>
  )
}

export default Hero