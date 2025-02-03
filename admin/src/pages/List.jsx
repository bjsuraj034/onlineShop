import React, { useEffect, useState } from 'react';
import { backendURL, Currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendURL + '/api/product/remove', { id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
        
        // Instead of fetching the list again, filter out the removed item
        setList(prevList => prevList.filter(item => item._id !== id));
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-bold'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Action</span>
        </div>
        {list.map((item) => (
          <div
            key={item._id}
            className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border text-sm'
          >
            <img
              src={item.image[0] || '/placeholder.png'}
              alt={item.name}
              className='w-12 h-12 object-cover'
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{Currency}{item.price}</p>
            <button
              onClick={() =>removeProduct(item._id)}
              className='text-red-500 text-center text-lg cursor-pointer'
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
