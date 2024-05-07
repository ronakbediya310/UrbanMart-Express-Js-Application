const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2; 
const stripe = require('stripe');

const connectToDatabase = require('./configs/db_config');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');

// dotenv config
dotenv.config();

// Connect to database
connectToDatabase();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Stripe Config
const Stripe = stripe(process.env.STRIPE_SECRET);

// Express object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoutes);

// PORT
const PORT = process.env.PORT || 8088;

// Running the server
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
