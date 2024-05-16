import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SkillSchema = new Schema( {
    skillName: {
        type: String,
        required: true,
        maxLentgh: 50,
    },

    skillDescription: {
        type: String,
        maxlength: 150,
    },

} );

export default mongoose.model( "Skill", SkillSchema );