import express from 'express'
import { addCart,getUserCart,updateCart } from "../controllers/cartController.js";
import authUser from '../middlewares/auth.js';

const cartRouter=express.Router()
cartRouter.get('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addCart)
cartRouter.post('/update',authUser,updateCart)


export default cartRouter