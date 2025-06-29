// routes/userRoutes.js
import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware.js';
import { User } from '../models/index.js';

const router = Router();
router.use(authenticateJWT);
router.get('/', authorizeRoles(['cmo','ceo']), async (req,res,next) => {
  try {
    const users = await User.findAll({ attributes: ['id','name','email','role'] });
    res.json(users);
  } catch(e){ next(e); }
});
export default router;
