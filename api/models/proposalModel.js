import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProposalSchema = new Schema( {
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
    coverLetter: {
        type: String,
        required: true,
    },
    // Campos para representar o custo da proposta
    pricingType: {
        type: String,
        enum: [ 'BUDGET', 'HOURLY_RATE' ],
        required: true,
    },
    proposedBudget: { // Usado quando pricingType for 'BUDGET'
        type: Number,
        required: function () { return this.pricingType === 'BUDGET'; },
    },
    proposedHourlyRate: { // Usado quando pricingType for 'HOURLY_RATE'
        type: Number,
        required: function () { return this.pricingType === 'HOURLY_RATE'; },
    },
    estimatedDuration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: [ 'PENDING', 'ACCEPTED', 'REJECTED' ],
        default: 'PENDING',
    },
    communicationChannelId: { // Referencia ao Canal de Comunicação
        type: Schema.Types.ObjectId,
        ref: 'CommunicationChannel',
        required: true,
    },
}, { timestamps: true } );

export default mongoose.model( 'Proposal', ProposalSchema );