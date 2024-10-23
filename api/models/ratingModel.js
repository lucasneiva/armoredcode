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
    evaluatorType: { 
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
    // Conditional Fields (based on evaluatedId's role)
    costBenefit: { 
        type: Number,
        min: 1,
        max: 5,
        required: function() {
            return this.evaluatedId.role === 'FREELANCER'; 
        }
    },
    clarityDescription: { 
        type: Number,
        min: 1,
        max: 5,
        required: function() { 
            return this.evaluatedId.role === 'CLIENT';
        } 
    },
    payments: { 
        type: Number,
        min: 1,
        max: 5,
        required: function() { 
            return this.evaluatedId.role === 'FREELANCER';
        } 
    },
    feedback: { 
        type: Number,
        min: 1,
        max: 5,
        required: function() { 
            return this.evaluatedId.role === 'FREELANCER'; 
        } 
    },
    comment: {
        type: String,
        maxLength: 1024,
        required: false,
    },
}, { timestamps: true });

export default mongoose.model('Rating', RatingSchema);