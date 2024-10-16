import express from 'express';
import { 
    createChatChannel, 
    getChatChannelById, 
    sendMessage 
} from '../controllers/ChatChannelController.js';
import { verifyUser } from '../utils/authMiddleware.js'; // Verifica se o usuário está autenticado

const router = express.Router();

// Criar um novo canal de comunicação (usado internamente, geralmente após a criação de uma proposta)
router.post('/', createChatChannel); // Pode ser restrito a um administrador ou a uma função específica

// Obter os detalhes de um canal de comunicação, incluindo o histórico de mensagens
// (Freelancer ou Cliente) - Requer verificação se o usuário está envolvido no canal
router.get('/:id', verifyUser, getChatChannelById); 

// Enviar uma nova mensagem para um canal de comunicação
// (Freelancer ou Cliente) - Requer verificação se o usuário está envolvido no canal
router.post('/:id/messages', verifyUser, sendMessage);

export default router;