const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "no user found" });
  }
};

const registerUser = async (req, res) => {
  try {
    if (await User.findOne({ email: req.body.email })) {
      res.status(409).send({
        message: "email already exist",
      });
    } else {
      const user = new User(req.body);
      const hashedPassword = await bcrypt.hash(user.password, 8);
      user.password = hashedPassword;
      await user.save();

      const token = user.createToken();
      res.status(201).send({ token, user });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("wrong email or password");
    } else {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        const token = user.createToken();

        res.send({ token });
      } else {
        res.send("wrong email or password");
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);

    res.status(200).send({ message: "user deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id);

    user.shoppingCart.push({
      name: req.body.name,
      amount: req.body.amount,
      weight: req.body.weight,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.send(`addError:${error.message}`);
  }
};

const removeProduct = async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id);

    user.shoppingCart = user.shoppingCart.filter((el) => {
      return el.name !== req.body.name;
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
};
module.exports = {
  getUserData,
  registerUser,
  loginUser,
  addProduct,
  deleteUser,
  removeProduct,
};
