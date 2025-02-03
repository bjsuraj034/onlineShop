import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import db from './config/mongooseConnection.js'
import connectCloudinary from './config/cloudinary.js'
import userRoutes from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'



//app config
const app=express();
const port=process.env.PORT ||4000
db()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoint
app.get('/',(req,res)=>{
    res.send("Api working")
})
app.use('/api/user',userRoutes)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.listen(port,()=>{
    console.log(`server is running in the port of ${port}`)
})