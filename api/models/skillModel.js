import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SkillSchema = new Schema( {
    skillName: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true,
    },

    skillDescription: {
        type: String,
        maxlength: 150,
    },

    skillImage: {
        type: String, // URL da imagem
    }

} );

export default mongoose.model( "Skill", SkillSchema );