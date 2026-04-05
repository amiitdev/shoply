import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Generate Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
};

//Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    //Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    //Generate token
    const token = generateToken(newUser);

    res.status(201).json({
      newUser: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //Generate token
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error); // 👈 ADD THIS
    res.status(500).json({ message: 'Server error' });
  }
};

//Get User Profile
export const getProfile = async (req, res) => {
  try {
    // req.user already has the user data from middleware
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(req.user);
    res.status(200).json(req.user);
  } catch (error) {
    console.error('GET PROFILE ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//Admin Only Route
export const adminUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Welcome Admin!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Logout User
export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
