import express from 'express';
import { ObjectId } from 'mongoose';
import { verifyToken } from '../middlewares/verifyAuth.js';
import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';
// import stripe from 'stripe'; // Uncomment when stripe functionality is ready

const router = express.Router();

router.get("/payment", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userID: ObjectId(req.user.uid) });

  if (!cart || cart.products.length <= 0) {
    return res.status(400).json(checkoutResponse.cartIsEmpty);
  }

  let cartPopulated = await cart.populate({
    path: 'products.productID',
    select: ['title', 'price'],
  });

  let cartTotal = 0;
  for (const product of cartPopulated.products) {
    cartTotal += product.quantity * product.productID.price;
  }

  // Commenting out payment-related code:
  /*
  const paymentIntent = await stripe(process.env.STRIPE_SECRET).paymentIntents.create({
    amount: cartTotal * 100,
    currency: "inr",
  });

  return res.json({
    clientSecret: paymentIntent.client_secret,
    finalOrder: {
      ...cartPopulated._doc,
      amount: cartTotal,
    },
  });
  */

  // New response without payment
  return res.json({
    status: "ok",
    message: "Payment functionality is currently disabled.",
    finalOrder: {
      ...cartPopulated._doc,
      amount: cartTotal,
    },
  });
});

const checkoutResponse = {
  cartIsEmpty: {
    status: "error",
    message: "cannot checkout an empty cart",
  },
};

export default router;
