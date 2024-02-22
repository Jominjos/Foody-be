const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE);
    console.log(`connected to db ${conn.connection.host}`);
  } catch (error) {
    console.error(`error:${error.message}`);
  }
};
module.exports = connectDb;
