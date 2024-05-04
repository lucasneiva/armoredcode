import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Technology from './Technology.js';
import projectCategory from './projectCategory.js';
import Skill from './Skill.js';


const RequirementSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirementType: { type: String, enum: ["SOURCE_CODE", "DOCUMENTATION", "TEST_REPORT"] }
});

const projectSchema = new Schema({
    clientId: { 
        type: Schema.Types.ObjectId,
        required: true 
    },

    freelancerId: {
        type: Schema.Types.ObjectId
    },

    projectCategory: {
        type: projectCategory.schema,
        required: true 
    },

    skills: [Skill.schema],

    technologies: [Technology.schema],

    requirements: [RequirementSchema],

    projectTitle: {
        type: String,
        required: true
    },

    projectDescription: {
        type: String,
        required: true
    },

    hourlyRateLowerBound: {
        type: Number
    },

    hourlyRateUpperBound: {
        type: Number
    },

    isFixedRate: {
        type: Boolean
    },

    fixedBudget: {
        type: Number
    },

    estimatedDuration: {
        type: Number
    },

    projectSize: {
        type: String,
        enum: ["SMALL", "MEDIUM", "LARGE"] 
    },

    status: {
        type: String,
        enum: ["DRAFT", "POSTED"]
    },

    experienceLevel: {
        type: String,
        enum: ["ENTRY-LEVEL", "MID-LEVEL", "SENIOR"]
    },

    startDate: {
        type: Date
    },

    endDate: {
        type: Date
    },

    isRemote: {
        type: Boolean
    },

    city: {
        type: String,
        enum: ["SOROCABA", "VOTORANTIM", "ITU", "ARAÇOIABA DA SERRA", "PORTO FELIZ"]
    }
});

export default mongoose.model("Project", projectSchema);