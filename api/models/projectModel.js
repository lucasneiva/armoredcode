import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import locationModel from './locationModel.js';

const RequirementSchema = new Schema( {
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    requirementType: {
        type: String,
        enum: [ "SOURCE_CODE", "DOCUMENTATION", "TEST_REPORT" ]
    }

} );

const ProjectSchema = new Schema( {
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    freelancerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },

    projectCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "ProjectCategory",
        required: true
    },

    skillIds: [{
        type: Schema.Types.ObjectId,
        ref: "Skill"
    }],

    technologyIds: [{
        type: Schema.Types.ObjectId,
        ref: "Technology"
    }],

    requirements: [ RequirementSchema ],

    projectTitle: {
        type: String,
        required: true
    },

    projectDescription: {
        type: String,
        required: true
    },

    projectHourlyRate: {
        type: Object,

        min: {
            type: Number
        },

        max: {
            type: Number
        },

        currency: {
            type: String,
            default: "R$"
        }
    },

    projectBudget: {
        type: Object,

        min: {
            type: Number
        },

        max: {
            type: Number
        },

        currency: {
            type: String,
            default: "R$"
        }
    },

    pricingType: {
        type: String,
        enum: ["BUDGET", "HOURLY_RATE"],
        required: true,
    },

    estimatedDuration: {
        type: Number
    },

    projectSize: {
        type: String,
        enum: [ "SMALL", "MEDIUM", "LARGE" ]
    },

    projectStatus: {
        type: String,
        enum: [ "DRAFT", "POSTED" ]
    },

    experienceLevel: {
        type: String,
        enum: [ "ENTRY-LEVEL", "MID-LEVEL", "SENIOR" ]
    },

    workModel: {
        type: String,
        enum: ["REMOTE", "HYBRID", "ON_SITE"],
        required: true,
    },

    location: {
        type: locationModel.schema,
        required: false,
    },

    startDate: {
        type: Date
    },

    endDate: {
        type: Date
    },
    
} );

export default mongoose.model( "Project", ProjectSchema );
