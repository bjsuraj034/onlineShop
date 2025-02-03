import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const Bestsellitems = ({name,image,price,id}) => {
    const {currency }=useContext(ShopContext);
  return (
  <Link to={`/product/${id}`}>
    <div className=''>
        <img src={image[0]} alt="" className='hover:scale-110 transition-all ease-in-out'/>
          <p>{name}</p>
        <div className='flex gap-1'>
          <p>{price}</p>
          <p>{currency}</p>
        </div>
    </div>

  </Link>
  )
}

export default Bestsellitems