import * as authService from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.json({ user, token });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};