// db.js or mongoose.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:3000/test', {
      useNewUrlParser: true, // Remove this line
      useUnifiedTopology: true, // Remove this line
      serverSelectionTimeoutMS: 15000,
      // Add the following line if you want to suppress the deprecation warnings
      useFindAndModify: false,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
