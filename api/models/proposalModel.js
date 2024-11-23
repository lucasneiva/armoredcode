import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProposalSchema = new Schema({
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
    pricingType: {
        type: String,
        enum: ['BUDGET', 'HOURLY-RATE'],
        required: true,
    },
    proposedBudget: { // Usado quando pricingType for 'BUDGET'
        type: Number,
        required: function () { return this.pricingType === 'BUDGET'; },
    },
    proposedHourlyRate: { // Usado quando pricingType for 'HOURLY-RATE'
        type: Number,
        required: function () { return this.pricingType === 'HOURLY-RATE'; },
    },
    estimatedDuration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'DRAFT',
    },
    ChatChannelId: { // Referencia ao Canal de Comunicação
        type: Schema.Types.ObjectId,
        ref: 'ChatChannel',
        required: false,
    },
    rejectionReason: {
        type: String,
        required: function () { return this.status === 'REJECTED'; },
    },
}, { timestamps: true });

export default mongoose.model('Proposal', ProposalSchema);