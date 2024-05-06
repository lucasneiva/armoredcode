import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LanguageSchema = new Schema( {
    language: {
        type: String,
        required: true
    },

    proficiencyLevel: {
        type: String,
        required: false,
        enum: [ "BEGINNER", "INTERMEDIATE", "ADVANCED" ]
    }

} );

export default mongoose.model( "Language", LanguageSchema );
