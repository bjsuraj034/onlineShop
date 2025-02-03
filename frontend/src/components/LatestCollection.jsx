import React, { useContext, useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Productiteam from './Productiteam'

const LatestCollection = () => {
    const {products}=useContext(ShopContext)
    const [latestProduct, setlatestProduct] = useState([]);
    useEffect(()=>{
      setlatestProduct(products.slice(0,10))

    },[products])
    
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-10'>
      <Title text1={"Latest"} text2={"Collection"}/>
      <p className='text-xs sm:text-sm w-3/4 text-center m-auto text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet id voluptatem sed eaque laboriosam mollitia eos molestias asperiores itaque unde?</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
        {latestProduct.map((item,index)=>(
          <Productiteam key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
        ))}

      </div>
    </div>
  )
}

export default LatestCollection