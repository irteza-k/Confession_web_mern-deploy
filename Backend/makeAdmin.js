const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function makeAdmin(username) {
  try {
    // Connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find and update the user
    console.log(`Looking for user: ${username}`);
    const user = await User.findOneAndUpdate(
      { username: username },
      { isAdmin: true },
      { new: true }
    );

    if (user) {
      console.log(`User ${username} is now an admin!`);
      console.log('User details:', {
        username: user.username,
        isAdmin: user.isAdmin,
        id: user._id
      });
    } else {
      console.log(`User ${username} not found`);
    }

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error:', error);
    if (error.name === 'MongoServerError') {
      console.error('MongoDB Server Error:', error.message);
    }
  }
}

// Get username from command line argument
const username = process.argv[2];
if (!username) {
  console.log('Please provide a username as an argument');
  process.exit(1);
}

makeAdmin(username); 