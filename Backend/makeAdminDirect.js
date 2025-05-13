const mongoose = require('mongoose');
require('dotenv').config();

async function makeAdmin(username) {
  try {
    // Connect to MongoDB using the same connection string as your server
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get the users collection
    const users = mongoose.connection.collection('users');
    
    // List all usernames
    const allUsers = await users.find({}, { projection: { username: 1 } }).toArray();
    console.log('All usernames in the database:');
    allUsers.forEach(u => console.log('-', u.username));

    // Update the user
    const result = await users.updateOne(
      { username: username },
      { $set: { isAdmin: true } }
    );

    if (result.matchedCount > 0) {
      console.log(`User ${username} is now an admin!`);
    } else {
      console.log(`User ${username} not found`);
    }

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Get username from command line argument
const username = process.argv[2];
if (!username) {
  console.log('Please provide a username as an argument');
  process.exit(1);
}

makeAdmin(username); 