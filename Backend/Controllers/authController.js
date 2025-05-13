const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, password });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ 
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.username || user.username;
    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();
    res.json({
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all users (Admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    console.log('Delete user request received for ID:', req.params.id);
    console.log('Request user:', {
      id: req.user._id,
      username: req.user.username,
      isAdmin: req.user.isAdmin
    });

    // Verify admin status
    if (!req.user.isAdmin) {
      console.log('Non-admin user attempted to delete user');
      return res.status(403).json({ message: "Only admins can delete users" });
    }

    // Find the user to be deleted
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      console.log('User not found:', req.params.id);
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting admin users
    if (userToDelete.isAdmin) {
      console.log('Attempted to delete admin user');
      return res.status(403).json({ message: "Cannot delete admin users" });
    }

    // Delete the user
    console.log('Deleting user:', userToDelete.username);
    try {
      const result = await User.findByIdAndDelete(req.params.id);
      console.log('Delete result:', result);

      if (!result) {
        console.log('No user was deleted');
        return res.status(404).json({ message: "User not found or could not be deleted" });
      }

      res.json({ message: "User removed successfully" });
    } catch (deleteError) {
      console.error('Error during user deletion:', deleteError);
      throw deleteError;
    }
  } catch (err) {
    console.error('Delete User Error:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    
    // Handle specific MongoDB errors
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    res.status(500).json({ 
      message: "Server Error", 
      error: err.message
    });
  }
};
