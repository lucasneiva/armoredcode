import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LanguageSchema = new Schema( {
    language: {
        type: String,
        required: true
    },

    proficiencyLevel: {
        type: String,
        required: true
    }

} );

export default mongoose.model( "Language", LanguageSchema );
