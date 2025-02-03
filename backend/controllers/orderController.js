import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js'
import productModel from '../models/productModel.js';
import mongoose from "mongoose";

const placeOrders = async (req, res) => {
  try {
    const { userId, totalAmount, address, items, paymentMethod } = req.body;

    if (!userId || !totalAmount || !address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if user has previous orders

    // Fetch product details
    const productsWithDetails = await Promise.all(
      items.map(async (item) => {
        const product = await productModel.findById(item.productId).select("name price image");
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found.`);
        }
        return {
          productId: item.productId,
          quantity: item.quantity,
          name: product.name,
          price: product.price,
          image: product.image[0], // Assuming image is an array
          size: item.size, // Ensure size is included
        };
      })
    );

    // Create order
    const orderData = {
      userId,
      totalAmount,
      address,
      products: productsWithDetails,
      paymentMethod,
 // Store fi charge separately
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart after order placement
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ 
      success: true, 
      message: "Order placed successfully.", 
      order: newOrder 
    });
  } catch (error) {
    console.error("Error placing order:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


  


//placing orders using razors method
const placeOrderRazorpay=async(req,res)=>{
    res.json({message:'Done'})
    
}

//all orders for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.aggregate([
      {
        $project: {
          _id: 1, // Ensure the order ID remains
          userId: 1,
          address: 1,
          paymentMethod: 1,
          totalAmount: 1,
          products: 1,
          paymentStatus: 1,
          createdAt: 1
        }
      },
      { $sort: { createdAt: -1 } }
    ]);    
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//user order data for frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// updating the status


const updateStatus = async (req, res) => {
  try {
    const { orderId, status: newStatus } = req.body;

    // Validate orderId format
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid Order ID format" });
    }

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );


    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid Order ID" });
    }

    const order = await orderModel.findById(orderId)
      .populate("userId", "name email") // Ensure this is correct
      .lean();

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};




  

export {placeOrders,placeOrderRazorpay,allOrders,userOrders,updateStatus,getOrderDetails}