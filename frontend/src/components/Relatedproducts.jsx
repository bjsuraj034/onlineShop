import React, { useContext, useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Productiteam from './Productiteam';


const Relatedproducts = ({category,subCatagory}) => {
    
    const {products}=useContext(ShopContext)
    const [related, setrelated] = useState([]);

    useEffect(()=>{
        if(products.length>0)
        {
            let productCopy=products.slice();
            productCopy=productCopy.filter((item)=>category === item.category);
            productCopy=productCopy.filter((item)=>subCatagory=== item.subCatagory);
            setrelated(productCopy)
        }
    },[products])
  return (
    <div className='my-24'>
        <div className='text-3xl text-center py-2'>
        <Title text1={"Related"} text2={"Collection"}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-5'>
            {related.map((item,index)=>(
                
                <Productiteam key={index} price={item.price} id={item._id} name={item.name}  image={item.image}/>
            ))}

        </div>
    </div>
  )
}

export default Relatedproducts