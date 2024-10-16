import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ChatChannelSchema = new Schema( {
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    freelancerId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencia ao usuário Freelancer
        required: true,
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencia ao usuário Cliente
        required: true,
    },
    messages: [ {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    } ],
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true } );

export default mongoose.model( 'ChatChannel', ChatChannelSchema );