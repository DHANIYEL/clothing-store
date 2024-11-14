import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// Register User
const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists with that email",
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({ fullname, email, password: passwordHash });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
    });

  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({
      status: "error",
      message: "Unexpected error occurred",
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect email or password",
      });
    }

    // Check if password matches
    const isValidLogin = await bcrypt.compare(password, user.password);
    if (!isValidLogin) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect email or password",
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        uid: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    return res.json({
      status: "success",
      message: "Login successful",
      accessToken: jwtToken,
    });

  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      status: "error",
      message: "Unexpected error occurred",
    });
  }
};

export { registerUser, loginUser };
