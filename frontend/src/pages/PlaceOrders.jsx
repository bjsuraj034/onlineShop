import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Carttotal from "../components/Carttotal";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";
import {jwtDecode} from "jwt-decode"; // Ensure proper import if using ES6

const PlaceOrders = () => {
  const {
    navigate,
    backendURL,
    cartItems,
    token,
    setcartItems,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);
  const [paymentMethod, setpaymentMethod] = useState("COD");
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }
  };
   
        

  const submitHandler = async (event) => {
    event.preventDefault();

    // Validate form data
    for (const key in formdata) {
      if (!formdata[key].trim()) {
        toast.error(`${key} is required.`);
        return;
      }
    }

    try {
      const totalAmount = getCartAmount() + delivery_fee;
      if (totalAmount <= 0) {
        toast.error("Total amount cannot be zero.");
        return;
      }

      const userId = getUserIdFromToken(token);
      if (!userId) {
        toast.error("Invalid user authentication. Please log in again.");
        return;
      }
      

      let orderItems=[]

for (const items in cartItems) {
  for (const item in cartItems[items]) {
    if (cartItems[items][item] > 0) {
      orderItems.push({
        productId: items,
        size: item,
        quantity: cartItems[items][item],
      });
    }
  }
}

      const orderData = {
        userId,
        address: formdata,
        items: orderItems,
        totalAmount,
        paymentMethod,
      };

      if (paymentMethod === "COD") {
        // Handle COD order
        const response = await axios.post(
          `${backendURL}/api/order/place`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data)
        
        if (response.data.success) {
          toast.success("Order placed successfully!");
          setcartItems({});
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      } else if (paymentMethod === "RAZORPAY") {
        // Handle Razorpay order
        await initiateRazorpayPayment(orderData);
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
      toast.error("An error occurred while placing the order.");
    }
  };
  useEffect(()=>{
    console.log(cartItems)
    
  },[])


  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* Form Fields */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            name="firstname"
            value={formdata.firstname}
            onChange={onChangeHandler}
            className="py-2 px-5 border-2 border-gray-400 w-full"
            type="text"
            placeholder="FirstName"
          />
          <input
            name="lastname"
            value={formdata.lastname}
            onChange={onChangeHandler}
            className="py-2 px-5 border-2 border-gray-400 w-full"
            type="text"
            placeholder="LastName"
          />
        </div>
        <input
          name="email"
          value={formdata.email}
          onChange={onChangeHandler}
          className="py-2 px-5 border-2 border-gray-400 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          name="street"
          value={formdata.street}
          onChange={onChangeHandler}
          className="py-2 px-5 border-2 border-gray-400 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-5">
          <input
            name="city"
            value={formdata.city}
            onChange={onChangeHandler}
            className="py-2 px-5 border-2 border-gray-400 w-full"
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            value={formdata.state}
            onChange={onChangeHandler}
            className="py-2 px-5 border-2 border-gray-400 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-5">
          <input
            name="zipcode"
            value={formdata.zipcode}
            onChange={onChangeHandler}
            className="py-2 px-5 border-2 border-gray-400 w-full"
            type="text"
            placeholder="Zipcode"
          />
          <input
            name="country"
            value={formdata.country}
            onChange={onChangeHandler}
            className="py-2 px-5 border-2 border-gray-400 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          name="phone"
          value={formdata.phone}
          onChange={onChangeHandler}
          className="py-2 px-5 border-2 border-gray-400 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right Section */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <Carttotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setpaymentMethod("COD")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5  border rounded-full ${
                  paymentMethod === "COD" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on Delivery
              </p>
            </div>
            <div
              onClick={() => setpaymentMethod("RAZORPAY")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <img src={assets.razorpay} alt="Razorpay" />
              <p
                className={`min-w-3.5 h-3.5  border rounded-full ${
                  paymentMethod === "RAZORPAY" ? "bg-green-400" : ""
                }`}
              ></p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="px-2 py-2 text-white bg-black"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrders;
