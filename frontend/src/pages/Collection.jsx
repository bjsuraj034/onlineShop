import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Productiteam from "../components/Productiteam";

const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setfilterProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [sortType, setsortType] = useState('relevant')
  const toggleCategory = (e) => {
    const value = e.target.value;
    setcategory((prev) => {
      if (prev.includes(value)) {
        // If the value already exists, remove it
        return prev.filter((item) => item !== value);
      } else {
        // If the value doesn't exist, add it
        return [...prev, value];
      }
    });
  };
  const toggleSubcategory=(e)=>{
    const value=e.target.value
    setsubCategory((prev)=>{
      if(prev.includes(value)){
        return prev.filter((item)=>item!==value)
      }
      else{
        return [...prev,value]
      }
    })
  }
  const applyFilter=()=>{
    let productsCopy=products.slice();

    if(showSearch && search)
    {
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0)
    {
      console.log(category.length)
      productsCopy=productsCopy.filter(item=>category.includes(item.category))
    }
    if(subCategory.length>0)
    {
      console.log(subCategory.length);
      productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setfilterProducts(productsCopy)
  }

  const sortProduct=()=>{
    let fpCopy=filterProducts.slice()
    switch(sortType)
    {
      case 'low-high':
        setfilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setfilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;
        default:
          applyFilter();
          break;
    }
  }
  
  
  useEffect(()=>{
    applyFilter()

  },[category,subCategory,search,showSearch,products]);

  useEffect(()=>{
    sortProduct();
  },[sortType])



  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* {filter option ko lagee}
       */}
      <div className="min-w-60">
        <p onClick={()=>{
          setShowFilter(!showFilter)
        }} className="my-2 text-xl flex  items-center cursor-pointer gap-3">
          Filter
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90':'' }`} src={assets.sidearrow} alt="" />
        </p>
        {/* {catagory filter}
         */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"
            } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Catogeory</p>
          <div className="flex flex-col gap-2 font-light text-sm">
            <p className="flex gap-2">
              <input
                className="w-4 "
                type="checkbox"
                name=""
                id=""
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-4 "
                type="checkbox"
                name=""
                id=""
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-4 "
                type="checkbox"
                name=""
                id=""
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        
        </div>
        {/* {Type filter} */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"
            } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 font-light text-sm">
            <p className="flex gap-2">
              <input
                className="w-4 "
                type="checkbox"
                name=""
                id=""
                value={"Topwear"}
                onChange={toggleSubcategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-4 "
                type="checkbox"
                name=""
                id=""
                value={"Bottomwear"}
                onChange={toggleSubcategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-4 "
                type="checkbox"
                name=""
                id=""
                value={"Winterwear"}
                onChange={toggleSubcategory}
              />
              Winterwear
            </p>
          </div>
        
        </div>
      </div>
      {/* {right side0} */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* {product sort} */}
        <select onChange={(e)=>{setsortType(e.target.value)}} className="border border-gray-400 text-sm px-2">
          <option  value="relevant">Relevant</option>
          <option  value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
        </div>
        {/* {maping the  products } */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          { filterProducts.map((item,index)=>(
            <Productiteam key={index} id={item ._id} price={item.price} name={item.name} image={item.image}/>
          ))}
        </div>
      </div>
     </div>
  );
};

export default Collection;
