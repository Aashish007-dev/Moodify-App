const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  const isAlredyRegistered = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlredyRegistered) {
    return res.status(400).json({
      message: "User with the same email or username already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created Successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginUserController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }]
  }).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials.",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggedIn successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
      
    },
  });
}

async function getMeController (req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User fetched Successfully.",
        user
    })
}

async function logoutUserController (req, res) {
    const token = req.cookies.token;

    res.clearCookie("token")

    await blacklistModel.create({token});

    res.status(201).json({
        message: "Logout Successfully."
    })
}

module.exports = {
  registerUserController,
  loginUserController,
  getMeController,
  logoutUserController
};
