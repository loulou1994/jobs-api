const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};

const login = async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    throw new BadRequestError(
      'provide both the email and password credentials'
      );
    }
    const user = await User.findOne({ email });
    const isPasswordCorrect = await user.comparePassword(password);
        
  if (!user || !isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: res.username,
    },
    token,
  });
};

module.exports = {
  register,
  login,
};