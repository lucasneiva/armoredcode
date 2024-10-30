// ChatChannelController.js

import ChatChannel from '../models/chatChannelModel.js';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';

// Create a new chat channel (internal use)
export const createChatChannel = async ( req, res, next ) => {
    try {
        const { projectId, freelancerId, clientId } = req.body;

        // Verificar se já existe um canal para este projeto e freelancer
        const existingChannel = await ChatChannel.findOne( { projectId, freelancerId, clientId } );
        if ( existingChannel ) {
            return next( createError( 400, 'Já existe um canal de comunicação para este projeto e freelancer.' ) );
        }

        const newChatChannel = new ChatChannel( {
            projectId,
            freelancerId,
            clientId,
        } );

        const savedChatChannel = await newChatChannel.save();

        return next( createSuccess( 201, 'Canal de comunicação criado com sucesso.', savedChatChannel ) );

    } catch ( error ) {
        console.error( 'Error creating chat channel:', error );
        return next( createError( 500, 'Erro interno do servidor.' ) );
    }
};

// Get chat channel details, including message history
export const getChatChannelById = async ( req, res, next ) => {
    try {
        const channelId = req.params.id;
        const userId = req.user.id; // ID do usuário logado

        // Buscar o canal pelo ID
        const chatChannel = await ChatChannel.findById( channelId )
            .populate( 'messages.senderId', 'firstName lastName' ); // Popular os dados do remetente da mensagem

        if ( !chatChannel ) {
            return next( createError( 404, 'Canal de comunicação não encontrado.' ) );
        }

        // Verificar se o usuário está envolvido no canal (Freelancer ou Cliente)
        if ( chatChannel.freelancerId.toString() !== userId && chatChannel.clientId.toString() !== userId ) {
            return next( createError( 403, 'Você não tem permissão para acessar este canal.' ) );
        }

        return next( createSuccess( 200, 'Detalhes do canal de comunicação.', chatChannel ) );

    } catch ( error ) {
        console.error( 'Error getting chat channel:', error );
        return next( createError( 500, 'Erro interno do servidor.' ) );
    }
};

// Send a new message to a chat channel
export const sendMessage = async ( req, res, next ) => {
    try {
        const channelId = req.params.id;
        const userId = req.user.id;
        const { content } = req.body;

        // Buscar o canal pelo ID
        const chatChannel = await ChatChannel.findById( channelId );

        if ( !chatChannel ) {
            return next( createError( 404, 'Canal de comunicação não encontrado.' ) );
        }

        // Verificar se o usuário está envolvido no canal (Freelancer ou Cliente)
        if ( chatChannel.freelancerId.toString() !== userId && chatChannel.clientId.toString() !== userId ) {
            return next( createError( 403, 'Você não tem permissão para enviar mensagens neste canal.' ) );
        }

        // Adicionar a nova mensagem ao array de mensagens
        chatChannel.messages.push( { senderId: userId, content } );

        // Salvar o canal atualizado
        const updatedChatChannel = await chatChannel.save();

        return next( createSuccess( 200, 'Mensagem enviada com sucesso.', updatedChatChannel ) );

    } catch ( error ) {
        console.error( 'Error sending message:', error );
        return next( createError( 500, 'Erro interno do servidor.' ) );
    }
};

// Obter todos os canais de chat de um usuário
export const getUserChatChannels = async ( req, res, next ) => {
    try {
        const userId = req.user.id;

        // Encontrar todos os canais onde o usuário é freelancer ou cliente
        const chatChannels = await ChatChannel.find( {
            $or: [ { freelancerId: userId }, { clientId: userId } ],
        } )
            .populate( "freelancerId", "firstName lastName" )
            .populate( "clientId", "firstName lastName" )
            .sort( { updatedAt: -1 } ); // Ordenar por data da última atualização (aproximado da última mensagem)

        return next(
            createSuccess( 200, "Lista de canais de chat do usuário.", chatChannels )
        );
    } catch ( error ) {
        console.error( "Error getting user chat channels:", error );
        return next( createError( 500, "Erro interno do servidor." ) );
    }
};
