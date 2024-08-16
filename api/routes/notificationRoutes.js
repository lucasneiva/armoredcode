import express from 'express';
import { 
    getFreelancerNotifications, 
    markNotificationAsRead 
} from '../controllers/notificationController.js';
import { verifyFreelancer } from '../utils/authMiddleware.js';

const router = express.Router();

// Listar todas as notificações de um freelancer específico
router.get('/freelancer/:freelancerId', verifyFreelancer, getFreelancerNotifications);

// Marcar uma notificação como lida
router.put('/:id', verifyFreelancer, markNotificationAsRead);

export default router;