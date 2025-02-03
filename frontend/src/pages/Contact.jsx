import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='py-10 m-auto'>
      <div className='text-2xl text-center'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
        <div className='flex flex-col justify-center sm:flex-row gap-10 mt-10 my-15'>
          <img className='sm:w-1/4 w-full' src={assets.contact} alt="" />
          <div className='flex flex-col justify-evenly'>
            <h1>Our Store</h1>
          <div>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>
          <div>
            <p>Tel: (415) 555-0132</p>
            <p>Email: admin@forever.com</p>
          </div>
          <h1>Carrers at Forever</h1>
          <p>Learn more about our teams and job openings</p>
          <button className='px-2 py-4 border bg-white text-black hover:bg-black hover:text-white transition-all duration-500 delay-400 ease-in-out '>Explore</button>


          </div>

        </div>

    </div>
  )
}

export default Contact