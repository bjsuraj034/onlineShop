import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from '../components/Title'
import Relatedproducts from "../components/Relatedproducts";

const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setsize] = useState('')

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]); // Set the first image as default
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products,productId]);

  return productData ? (
    <div className="pt-10 border-t-2">
      {/* Main Product Container */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Image Section */}
        <div className="flex gap-3 sm:w-3/4">
          {/* Small Images */}
          <div className="flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto w-1/5">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                onClick={() => setImage(item)} // Change big image on click
                className="w-20 h-20 object-cover cursor-pointer border rounded-md hover:border-blue-500"
              />
            ))}
          </div>

          {/* Main Big Image */}
          <div className="w-4/5">
            <img
              src={image}
              alt="Main Product"
              className="w-full h-auto object-contain border rounded-lg"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="sm:w-1/2 flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl text-gray-950 font-extrabold">{productData.name}</h1>
          <p className="text-gray-700">{productData.description}</p>
          <div className="flex gap-1 items-center">
            <img className="h-4" src={assets.star} alt="" />
            <img className="h-4" src={assets.star} alt="" />
            <img className="h-4" src={assets.star} alt="" />
            <img className="h-4" src={assets.star} alt="" />
            <img className="h-4" src={assets.dullstar} alt="" />
            <p className="font-extrabold">(122)</p>
          </div>
          <div className="mt-5 flex gap-1 font-extrabold text-3xl">
            <h1>{currency}</h1>
            <h1>{productData.price}</h1>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus corporis minus vitae pariatur vero repellat architecto at ex quidem iste!</p>
          <div>
            <p>Select sizes</p>
            <div
             className="flex gap-4 mt-3">
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>{setsize(item)}} className={`bg-gray-200 px-5 py-2 ${item === size ? "border-2 border-orange-400" : 'bg-gray-200'}`} key={index}>{item}</button>
              ))}
             </div>
          <button onClick={()=>addToCart(productData._id,size)} className="mt-8 bg-black py-3 px-5 text-white ">Add to cart</button>
          <hr  className="mt-8 sm:w-5/4"/>
          <div className="mt-8 text-gray-500 flex flex-col gap-1">
          <p>100% orignal products</p>
          <p>Cash on delivery is available in this products</p>
          <p>Easy return  and exchange policy within 7 days</p>

          </div>
          </div>
        </div>
      </div>
      <div className="mt-20 flex  flex-col">
        <div className="flex font-extrabold text-sm">
          <p className="border-[1px] border-gray-300 py-2 px-2">Description</p>
          <p className="border-[1px] border-gray-300 py-2 px-2">Review (122)</p>
        </div>
        <div className="py-5 px-5 border-[1px] border-gray-300 flex flex-col gap-3 text-gray-500">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus impedit repellat officiis, voluptatum, ratione dolores veniam sequi architecto odit quo harum molestiae voluptatibus perferendis in laborum hic, voluptas excepturi distinctio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus impedit repellat officiis, voluptatum, ratione dolores veniam sequi architecto odit quo harum molestiae voluptatibus perferendis in laborum hic, voluptas excepturi distinctio.
        </p>
        </div>
      </div>
      {/* {related products} */}
      <Relatedproducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;
