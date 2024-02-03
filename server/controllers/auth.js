const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../middlewares/createError");

const register = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const checkUserIsAlreadyExist = await UserModel.findOne({ userName });
    if (checkUserIsAlreadyExist) {
      return next(createError(201, "User Already Exist"));
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      // Stored hash in your password DB.
      if (err) {
        next(err);
      } else {
        const newUser = new UserModel({
          userName,
          password: hash,
        });
        await newUser.save();
        res
          .status(200)
          .send({
            username: userName,
            success: true,
            message: "User has been created!",
          });
      }
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const user = await UserModel.findOne({ userName });
    // console.log('user: ', user);
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        const token = jwt.sign({ id: user._id}, "shhhhh");
        const { password,...otherDetails } = user._doc; // user._doc console this you can see the details
        // console.log('user._doc: ', user._doc);
        res
          .cookie("access_token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          })
          .status(200)
          .send({
            user: { ...otherDetails, token },
            message: "Login Successfully!",
            success: true,
          });
      } else {
        next(createError(400, "Wrong password or username!"));
      }
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { register, login };
