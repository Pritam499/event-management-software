import { Router } from 'express';
import * as ctl from '../controllers/eventController.js';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authenticateJWT);

router.post('/', authorizeRoles(['employee', 'cmo']), ctl.create);
router.get('/', ctl.list);
router.patch('/:id/status', authorizeRoles(['cmo', 'ceo']), ctl.updateStatus);

export default router;