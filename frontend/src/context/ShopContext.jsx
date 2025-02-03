import { createContext, useEffect } from "react";
import { products } from "../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext=createContext();
const ShopContextProvider=(props)=>{
    const currency='Rs.';
    const delivery_fee=10;
    const backendURL=import.meta.env.VITE_BACKEND_URL
   const [search, setsearch] = useState('');
   const [showSearch, setshowSearch] = useState(false)
   const [cartItems, setcartItems] = useState({})
   const [products, setProducts] = useState([]);
   const [token, setToken] = useState('');
   const navigate=useNavigate()

   useEffect(() => {
    // Check for token in localStorage and set it in state
    const storedToken = localStorage.getItem("token");
    console.log(storedToken)
    if (!storedToken) {
      navigate("/login"); // Redirect to login if no token is found
    } else {
      setToken(storedToken);
      getUserCart(storedToken); // Fetch cart data if token exists
    }
  }, []);

   const    addToCart = async (itemId,size)=>{
    if(!size)
    {
        toast.error("please select the size");
        return ;
    }
   let cartData=structuredClone(cartItems);
   if(cartData[itemId])
   {
    if(cartData[itemId][size])
    {
        cartData[itemId][size]+=1;
    }
    else{
        cartData[itemId] [size]=1;
    }
   }
   else{
    cartData[itemId]={};
    cartData[itemId][size]=1;
   }
   setcartItems(cartData)
   if(token)
   {
    try {
        const response = await axios.post(
            `${backendURL}/api/cart/add`,
            { itemId, size },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Optional but recommended
                },
            }
        );
        // console.log(response)
        // if (response.data.success) {
        //     console.log("Item added to cart successfully");
        // } else {
        //     toast.error(response.data.message);//debugging  ko lagee
        // }
    } catch (error) {
        console.error("Error adding item to cart:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || error.message);
    }
    
   }

   }
   const getCartCount=()=>{

    let totalCount=0;
    for(const items in cartItems)
    {
        for(const item in cartItems[items])
        {
            try{
                if(cartItems[items][item]>0){
                    totalCount+=cartItems[items][item]
                }

            }
            catch(error)
            {
                console.log(error)
                toast.error(error.message)

            }
        }
    }
    return totalCount;
   }

   const updateQunatity=async (itemId,size,quantity)=>{
    console.log(cartItems)
    let cartData=structuredClone(cartItems);
    cartData[itemId][size]=quantity;    
    setcartItems(cartData)
    if(token)
    {
        try {
            await axios.post(backendURL+'/api/cart/update',{itemId,size,quantity},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }

   }
//frontend mah data fetch garna ko lageee yeslay gar   
const getCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue;
      for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
              totalAmount += itemInfo.price * quantity;
          }
      }
  }
  return totalAmount; // Removed delivery_fee addition
};


const getProductsData=async()=>{
    try {
        const response=await axios.get(backendURL+'/api/product/list')
        if(response.data.success)
        {
            setProducts(response.data.products)
        
        }
        else{
            toast.error(response.data.message)
        }
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }

   }
   const getUserCart = async (token) => {
    try {
      const response = await axios.get(`${backendURL}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        // console.log("Cart data fetched successfully:", response.data.cartData);
        setcartItems(response.data.cartData); // Ensure this updates your state correctly
      } else {
        toast.error(response.data.message || "Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching user cart:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };
   useEffect(()=>{
    getProductsData()
   },[])

    const value={
        products,
        currency,
        delivery_fee, 
        search,
        setsearch,
        showSearch,
        setshowSearch,cartItems,setcartItems,addToCart,
        getCartCount,updateQunatity,getCartAmount,
        navigate,backendURL,token,setToken,

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
    }
    export default ShopContextProvider;

