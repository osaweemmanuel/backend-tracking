
const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const authRouter = require('./routes/userRoutes');
const parcelRouter = require('./routes/parcelRoutes');
const protectedRoute = require('./routes/protectedRoute');
const walletRouter = require('./routes/walletRoute');
const receiptRoute=require("./routes/receiptRoutes");
const config = require("./config");

const cors = require('cors');
 const compression = require('compression');




// Initialize Express app
const app = express();



// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Serve static files from the `uploads` directory
app.use(express.static(path.resolve(__dirname, './uploads')));

// Parse incoming requests with URL-encoded and JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['PUT', 'GET', 'DELETE', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Pre-flight requests
app.options('*', cors());



// Routes
app.use('/api/v1/auth', authRouter);         // User authentication routes
app.use('/api/v1/parcels', parcelRouter);    // Parcel management routes
app.use('/api/v1/wallet', walletRouter);     // Wallet management routes
app.use('/api/v1', protectedRoute);          // Protected routes
app.use("/api/v1/receipts",receiptRoute);                                      //Receipt

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Optional: Error handling middleware for catching errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Simple route to test if the app is working
app.get('/', (req, res) => {
    res.send("The app is working now");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The app is running successfully on port ${port}`);
});
