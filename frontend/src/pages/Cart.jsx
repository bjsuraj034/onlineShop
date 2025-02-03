import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Carttotal from '../components/Carttotal';

const Cart = () => {
  const { products, currency, cartItems, updateQunatity, navigate } = useContext(ShopContext);

  const cartData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>
    Object.entries(sizes)
      .filter(([sizes, quantity]) => quantity > 0)
      .map(([sizes, quantity]) => ({
        _id: itemId,
        sizes,
        quantity,
      }))
  );

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  // Show message when cart is empty
  if (cartData.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
        <button
          onClick={() => navigate('/collection')}
          className="bg-black text-white py-2 px-4 mt-4"
        >
          Browse Collection
        </button>
        <button
  onClick={() => navigate('/orders')}
  className="bg-gray-700 text-white my-8 ml-4 py-2 px-2"
>
  TRACK PREVIOUS ORDERS
</button>

      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="Your" text2="Cart" />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-600 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr]"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData?.image?.[0] || 'default-image-url'}
                  alt={productData?.name || 'Product'}
                />
                <div>
                  <p className="text-gray-700 sm:text-xl text-sm font-extrabold">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency} {productData.price}
                    </p>
                    <p className="bg-gray-200 px-4 py-1">{item.sizes}</p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) =>
                  e.target.value > 0 &&
                  updateQunatity(item._id, item.sizes, Number(e.target.value))
                }
                className="border max-w-12 sm:max-w-18 px-2 sm:px-2 sm:h-7 h-5 sm:mr-1 mr-3 py-2"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQunatity(item._id, item.sizes, 0)}
                src={assets.deleter}
                alt="Delete"
                className="h-5 mr-4 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div>
          <div className="w-full sm:w-[450px]">
            <Carttotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate('/place-orders')}
                className="bg-black text-white my-8 py-2 px-2"
              >
                PROCEED TO CHECKOUT
              </button>
              <button
                onClick={() => navigate('/orders')}
                className="bg-gray-700 text-white my-8 ml-4 py-2 px-2"
              >
                VIEW ORDERS
              </button>


              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
