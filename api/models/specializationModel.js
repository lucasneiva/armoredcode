import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SpecializationSchema = new Schema( {
    specializationName: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
    },

    specializationDescription: {
        type: String,
        maxLength: 500,
    },
    
} );

export default mongoose.model( "Specialization", SpecializationSchema );