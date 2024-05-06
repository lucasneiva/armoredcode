import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const IndustrySchema = new Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
    },
    
} );

export default Industry = mongoose.model( "Industry", IndustrySchema );