import express from 'express';
import { celebrate } from 'celebrate';
import { auth as authSchema } from '../models/schema.js'; // Import schema
import { registerUser, loginUser } from '../controllers/auth.controller.js'; // Import controller functions

const authRouter = express.Router();

// Register route
authRouter.post(
  '/register',
  celebrate({ body: authSchema.register }), // Validate request body
  registerUser // Controller function to handle registration
);

// Login route
authRouter.post(
  '/login',
  celebrate({ body: authSchema.login }), // Validate request body
  loginUser // Controller function to handle login
);

export default authRouter;
