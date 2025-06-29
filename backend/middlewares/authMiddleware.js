import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const authenticateJWT = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(payload.id);
    next();
  } catch {
    res.sendStatus(403);
  }
};

export const authorizeRoles = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.sendStatus(403);
  next();
};