import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './config/mongooseConnection.js';
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
db();
connectCloudinary();

// 🔴 Fix: Explicitly Allow CORS for Your Frontend URLs
const allowedOrigins = [
    "https://online-shop-admin-rho.vercel.app",
    "https://online-shop-frontend-lemon.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}));

// 🔴 Fix: Handle Preflight (OPTIONS) Requests
app.options('*', cors());

// Middleware
app.use(express.json());

// API Endpoints
app.get('/', (req, res) => {
    res.send("API working");
});
app.use('/api/user', userRoutes);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
