import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Productiteam = ({id,name,image,price}) => {
    const{currency}=useContext(ShopContext)
  return (
    <>
    <Link className='cursor-pointer text-gray-700' to={`/product/${id}`}>
    <div className='overflow-hidden'>
        <img className=' hover:scale-110 transition ease-in-out 'src={image[0]} alt="" />
    </div>
    <p>{name}</p>
    <div className='flex gap-1'>
        <p>{currency}</p>
        <p>{price}</p>
    </div>
    </Link>
    </>
  )
}

export default Productiteam