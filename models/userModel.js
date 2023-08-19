const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});
userSchema.methods.createToken = function () {
  const token = jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
    },
    process.env.JWTSECRET
  );
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
