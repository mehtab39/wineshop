const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => console.error(error));
    const connection = mongoose.connection;
    console.log("Database Connected Successfully");
  } catch (error) {
    return error;
  }
};

module.exports = connectDB;