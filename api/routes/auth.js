import express from 'express';
import { celebrate } from 'celebrate';  // Import celebrate for validation
import { auth as authSchema } from '../models/schema.js'; // Import validation schema
import { registerUser, loginUser } from '../controllers/auth.controller.js'; // Import controller functions

const authRouter = express.Router();

// Register route
authRouter.post(
	'/register',
	celebrate({ body: authSchema.register }), // Validate registration data
	registerUser // Controller to handle registration logic
  );
  

// Login route
authRouter.post(
  '/login',
  celebrate({ body: authSchema.login }), // Validate login data using authSchema
  loginUser // Controller to handle login logic
);

export default authRouter;
