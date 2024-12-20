import express from 'express';
import { 
    createProposal, 
    getProposalById, 
    updateProposal, 
    getProposalsByProjectId, 
    getFreelancerProposals,
    deleteProposal,
    sendProposal,
    acceptProposal,
    rejectProposal,
} from '../controllers/proposalController.js';
import { verifyFreelancer, verifyClient, verifyToken } from '../utils/authMiddleware.js';

const router = express.Router();

// Criar uma nova proposta (Freelancer)
router.post('/', verifyFreelancer, createProposal);

// Obter os detalhes de uma proposta (Freelancer ou Cliente) - Requer verificação se o usuário está envolvido na proposta
router.get('/:id', verifyToken, getProposalById); // Ou verificar se é o cliente da proposta

// Atualizar uma proposta (Freelancer ou Cliente) - Requer verificação se o usuário está envolvido na proposta
router.put('/:id', verifyFreelancer, updateProposal); // Ou verificar se é o cliente da proposta

// Listar todas as propostas para um projeto específico (Cliente)
router.get('/project/:projectId', verifyClient, getProposalsByProjectId);

// Listar todas as propostas enviadas por um freelancer específico (Freelancer)
router.get('/freelancer/:freelancerId', verifyFreelancer, getFreelancerProposals);

router.delete('/:id', verifyFreelancer, deleteProposal);

// Send a proposal (Freelancer)
router.patch('/:id/send', verifyFreelancer, sendProposal);

router.patch('/:id', verifyFreelancer, updateProposal);

// Accept a proposal (Client)
router.patch('/:id/accept', verifyClient, acceptProposal);

// Reject a proposal (Client)
router.patch('/:id/reject', verifyClient, rejectProposal);

export default router;