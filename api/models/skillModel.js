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
        type: String, // Store the URL or path to the image
        // Other options depending on your storage strategy:
        // data: Buffer, // If storing image data directly in MongoDB (less common)
        // contentType: String, // If storing image data directly
    }

} );

export default mongoose.model( "Skill", SkillSchema );