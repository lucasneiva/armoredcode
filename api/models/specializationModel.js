import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SpecializationSchema = new Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String
    },
    
} );

export default mongoose.model( "Specialization", SpecializationSchema );