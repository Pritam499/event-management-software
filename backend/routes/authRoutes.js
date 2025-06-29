import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);

router.get('/me', authenticateJWT, (req, res) => {
  // req.user was loaded by authenticateJWT
  res.json(req.user);
});

export default router;
