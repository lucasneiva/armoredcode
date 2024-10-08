import express from 'express';
import { 
    createProposal, 
    getProposalById, 
    updateProposal, 
    getProjectProposals, 
    getFreelancerProposals 
} from '../controllers/proposalController.js';
import { verifyFreelancer, verifyClient } from '../utils/authMiddleware.js';

const router = express.Router();

// Criar uma nova proposta (Freelancer)
router.post('/', verifyFreelancer, createProposal);

// Obter os detalhes de uma proposta (Freelancer ou Cliente) - Requer verificação se o usuário está envolvido na proposta
router.get('/:id', verifyFreelancer, getProposalById); // Ou verificar se é o cliente da proposta

// Atualizar uma proposta (Freelancer ou Cliente) - Requer verificação se o usuário está envolvido na proposta
router.put('/:id', verifyFreelancer, updateProposal); // Ou verificar se é o cliente da proposta

// Listar todas as propostas para um projeto específico (Cliente)
router.get('/project/:projectId', verifyClient, getProjectProposals);

// Listar todas as propostas enviadas por um freelancer específico (Freelancer)
router.get('/freelancer/:freelancerId', verifyFreelancer, getFreelancerProposals);

export default router;