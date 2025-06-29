import { Router } from 'express';
import * as ctl from '../controllers/feedbackController.js';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = Router();

// Protect all feedback routes
router.use(authenticateJWT);

// Attendees may submit feedback for an event they attended
// (only employees/cmo/ceo who were confirmed attendees)
router.post('/:id', authorizeRoles(['employee', 'cmo', 'ceo']), ctl.submit);

// Only CMO and CEO can list **all** feedback
router.get('/', authorizeRoles(['cmo', 'ceo']), ctl.list);

export default router;
