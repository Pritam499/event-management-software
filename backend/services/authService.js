// const bcrypt = require('bcryptjs');
// const jwt    = require('jsonwebtoken');
// const { User } = require('../models');

// exports.register = async ({ name, email, password, role }) => {
//   const hash = bcrypt.hashSync(password, 8);
//   return User.create({ name, email, password: hash, role });
// };

// exports.login = async ({ email, password }) => {
//   const user = await User.findOne({ where: { email } });
//   if (!user || !bcrypt.compareSync(password, user.password)) {
//     throw new Error('Invalid credentials');
//   }
//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//   return { user, token };
// };

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const register = async ({ name, email, password, role }) => {
  const hash = bcrypt.hashSync(password, 8);
  return User.create({ name, email, password: hash, role });
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return { user, token };
};