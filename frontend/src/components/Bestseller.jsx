import React, { useContext, useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Bestsellitems from './Bestsellitems'

const Bestseller = () => {
    const {products}=useContext(ShopContext)
    const [bestSeller, setbestSeller] = useState([])
    useEffect(()=>{
        const bestProduct=products.filter((item)=>(item.bestSeller))
        setbestSeller(bestProduct.slice(0,5))
        
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={"Best"} text2={"Seller"}/>
            <p className='w-3/4  m-auto text-xs sm:text-xl text-gray-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, consectetur.</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {bestSeller.map((item,index)=>(
            <Bestsellitems key={index} id={item._id}  image={item.image} name={item.name} price={item.price}/>
          ))}
        
        </div>
        
    </div>
  )
}

export default Bestseller