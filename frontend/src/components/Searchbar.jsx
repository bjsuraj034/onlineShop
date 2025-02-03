import React, { useContext,useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
    const {search,setsearch,showSearch,setshowSearch}=useContext(ShopContext);
    const [visible, setvisible] = useState(false);
    const location=useLocation();
    useEffect(()=>{
      if(location.pathname.includes('/collection'))
      {
        setvisible(true)
      }
      else{
        setvisible(false)
      }
    },[location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-100 text-center'>
        <div className='inline-flex mr-2 items-center justify-center px-5 py-2 my-5 rounded-full w-3/4 sm:w-1/2 border-2 border-gray-600'>
        <input value={search} onChange={(e)=>{setsearch(e.target.value)}} type="text" name="" id="" placeholder='search' className='flex-1 outline-none bg-inherit text-sm'/>
        <img src={assets.search} className='w-4 cursor-pointer' alt="" />
        </div>
        <img onClick={()=>{setshowSearch(false)}} className='inline w-3 cursor-pointer' src={assets.crossIcon} alt="" />

    </div>
  ) :null
}

export default Searchbar