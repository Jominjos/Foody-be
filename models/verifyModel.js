const { default: mongoose } = require("mongoose");

const verifySchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  mobile: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },

  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
});

module.exports = mongoose.model("verifyUser", verifySchema);
