import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.js';
import register from './routes/auth.js';
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';
import checkoutRouter from './routes/checkout.js';
import { handleMalformedJson, formatCelebrateErrors } from './middlewares/handleError.js';

dotenv.config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log("Connected to database"))
  .catch(err => console.error(err));

// Global middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Change this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers you need
}));
app.use(express.json());
app.use(handleMalformedJson); // handle common request errors

// Routes
app.use("/auth", register);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
app.use("/checkout", checkoutRouter);

// Server status
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// Format Celebrate validation errors
app.use(formatCelebrateErrors);

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT || 5000}`);
});
