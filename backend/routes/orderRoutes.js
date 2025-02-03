import express from 'express'
import { allOrders,placeOrders,placeOrderRazorpay,userOrders,updateStatus,getOrderDetails } from '../controllers/orderController.js'
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js'

const orderRouter=express.Router()


//admin features 
orderRouter.get('/list',adminAuth,allOrders)

orderRouter.post('/updateStatus',adminAuth,updateStatus)


//payment features
orderRouter.post('/place',authUser,placeOrders)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)


//user features
orderRouter.post('/userorders',authUser,userOrders)

orderRouter.get("/:orderId", authUser,getOrderDetails);

export default orderRouter