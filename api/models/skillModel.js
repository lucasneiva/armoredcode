import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SkillSchema = new Schema( {
    skillName: {
        type: String,
        required: true
    },

    skillDescription: {
        type: String
    },

    proficiencyLevel: {
        type: String,
        required: false,
        enum: [ "BEGINNER", "INTERMEDIATE", "ADVANCED" ]
    }
    
} );

export default mongoose.model( "Skill", SkillSchema );