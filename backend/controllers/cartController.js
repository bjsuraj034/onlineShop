import userModel from "../models/userModel.js";
// import userModel from "../models/userModel";
import productModel from "../models/productModel.js";

const addCart = async (req, res) => {
  try {
    const { itemId, size, } = req.body;
    const userId = req.user._id; // Extracted from the token by authUser
  


    // Check if required fields are present
    if (!userId || !itemId || !size) {
      return res.json({ success: false, message: "Invalid input" });
    }

    // Fetch the product details
    const product = await productModel.findById(itemId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // Validate the size
    if (!product.sizes.includes(size)) {
      return res.json({ success: false, message: "Invalid size selected" });
    }

    // Fetch user data
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    // Update cartData
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Save the updated cart data
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error in addCart:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


  
  const updateCart = async (req, res) => {
    try {
      const userId=req.user._id
      const { itemId, size, quantity } = req.body;
  
      // Validate inputs
      if (!userId || !itemId || !size || quantity === undefined) {
        return res.status(400).json({ success: false, message: "Invalid input" });
      }
  
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      let cartData = userData.cartData;
  
      if (!cartData[itemId]) {
        return res.status(404).json({ success: false, message: "Item not found in cart" });
      }
  
      cartData[itemId][size] = quantity;
      await userModel.findByIdAndUpdate(userId, { cartData });
      return res.json({ success: true, message: "Cart updated" });
    } catch (error) {
      console.error("Error in updateCart:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  const getUserCart = async (req, res) => {
    try {
      const userId = req.user._id; 

  
      if (!userId) {
        return res.status(400).json({ success: false, message: "Invalid input" });
      }
  
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      return res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
      console.error("Error in getUserCart:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
export {addCart,updateCart,getUserCart}