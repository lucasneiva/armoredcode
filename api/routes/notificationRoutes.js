import express from 'express';
import { 
    getFreelancerNotifications, 
    markNotificationAsRead,
    createNotification,
    getInviteById,
    acceptInvite,
    rejectInvite
} from '../controllers/notificationController.js';
import { verifyFreelancer, verifyClient } from '../utils/authMiddleware.js';

const router = express.Router();

// Listar todas as notificações de um freelancer específico
router.get('/freelancer/:freelancerId', verifyFreelancer, getFreelancerNotifications);

// Listar uma notificação específica
router.get('/:id', verifyFreelancer, getInviteById);

// Marcar uma notificação como lida
router.put('/:id', verifyFreelancer, markNotificationAsRead);

// Create a new notification (Client)
router.post('/', verifyClient, createNotification);

// Reject an invite
router.patch('/:id/reject', verifyFreelancer, rejectInvite);

// Accept an invite
router.patch('/:id/accept', verifyFreelancer, acceptInvite);

export default router;