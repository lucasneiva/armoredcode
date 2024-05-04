import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WorkExperienceSchema = new Schema( {
    companyName: {
        type: String,
        required: true
    },

    jobTitle: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date
    },

    jobDescription: { 
        type: String 
    }

} );

export default mongoose.model( "WorkExperience", WorkExperienceSchema );