import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

// ✅ Allowed Frontend URLs
const allowedOrigins = [
    "https://online-shop-admin-rho.vercel.app",
    "https://online-shop-frontend-lemon.vercel.app"
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("API is working!");
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
