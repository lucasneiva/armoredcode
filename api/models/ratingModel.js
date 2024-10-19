import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    evaluatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    evaluatedId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    evaluatorType: { // Indicar se quem avaliou é cliente ou freelancer
        type: String,
        enum: ['CLIENT', 'FREELANCER'],
        required: true,
    },
    workQuality: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    communication: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    professionalism: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    costBenefit: { // Apenas para avaliações de clientes
        type: Number,
        min: 1,
        max: 5,
        required: function() { return this.evaluatorType === 'CLIENT'; }, 
    },
    clarityDescription: { // Apenas para avaliações de freelancers
        type: Number,
        min: 1,
        max: 5,
        required: function() { return this.evaluatorType === 'FREELANCER'; }, 
    },
    payments: { // Apenas para avaliações de freelancers
        type: Number,
        min: 1,
        max: 5,
        required: function() { return this.evaluatorType === 'FREELANCER'; }, 
    },
    feedback: { // Apenas para avaliações de freelancers
        type: Number,
        min: 1,
        max: 5,
        required: function() { return this.evaluatorType === 'FREELANCER'; }, 
    },
    comment: {
        type: String,
        maxLength: 1024,
        required: false,
    },
}, { timestamps: true });

export default mongoose.model('Rating', RatingSchema);