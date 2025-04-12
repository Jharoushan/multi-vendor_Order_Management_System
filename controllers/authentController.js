const userLoginSignup = require('../models/userLoginSignup');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const generateToken = user => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_Token_Secret, {
    expiresIn: '7d',
  });
};

exports.signup = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('customer', 'vendor', 'admin')
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = new userLoginSignup(req.body);
  await user.save();

  const token = generateToken(user);
  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userLoginSignup.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ error: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({ token });
};

