const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,  // Force IPv4 to avoid DNS resolution issues
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Don't exit process, allow server to still start for API testing
    console.log('Server will continue without database connection');
  }
};

module.exports = connectDB;
