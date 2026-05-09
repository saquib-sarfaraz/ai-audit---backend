const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in environment variables.');
    process.exit(1);
  }

  let retries = 3;
  while (retries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000, // timeout faster in production to trigger retry
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      break;
    } catch (error) {
      retries -= 1;
      console.error(`MongoDB Connection Attempt Failed: ${error.message}. Retries left: ${retries}`);
      if (retries === 0) {
        console.error('MongoDB connection exhausted. Terminating application.');
        process.exit(1);
      }
      // Wait 5 seconds before retrying
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

module.exports = connectDB;
