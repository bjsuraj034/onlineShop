import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletters from '../components/Newsletters'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center py-10 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='flex flex-col md:flex-row my-10 gap-20'>
        <img className=' sm:w-1/4 w-full object-cover object-right-bottom rounded-sm' src={assets.about} alt="" />
        <div className='flex flex-col gap-10 md:w-2/4'>
          <p>Forever was born out of a passion for innovation and a desipre to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
<p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>

          <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-extrabold text-black'>Our Mission</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam dolorem nihil necessitatibus. Asperiores vel quisquam expedita quas praesentium corporis ratione repudiandae illum, sed inventore repellendus neque eius eaque, corrupti qui!</p>
          </div>


        </div>

      </div>
          <div className='text-center text-2xl'>
            <Title text1={'WHY'} text2={'CHOOSE US'}/>
          </div>
          <div className='flex flex-col sm:flex-row mb-20'>
            <div className='border px-10 py-16 flex flex-col gap-4'>
              <h1 className='text-gray-800 font-extrabold'>Quality Assurance:</h1>
              <p className=' text-gray-500'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
            </div>
            <div className='border px-10 py-16 flex flex-col gap-4'>
            <h1 className='text-gray-800 font-extrabold'>Convenience</h1>
            <p className='text-gray-500'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier</p>
            </div>
            <div className='border px-10 py-16 flex flex-col gap-4'>
            <h1 className='text-gray-800 font-extrabold'>Exceptional Customer Service:</h1>
            <p className='text-gray-500'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
            </div>
          </div>
          <div className='text-xl'>

          <Newsletters/>
          </div>
    </div>
  )
}

export default About