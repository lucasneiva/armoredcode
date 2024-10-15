import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import locationModel from './locationModel.js';

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

    skillIds: [ {
        type: Schema.Types.ObjectId,
        ref: "Skill"
    } ],

    projectTitle: {
        type: String,
        required: true,
        maxLentgh: 100,
    },

    projectDescription: {
        type: String,
        required: true,
        maxLentgh: 500,
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
        },

        required: false,
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
        },

        required: false,
    },

    pricingType: {
        type: String,
        enum: [ "BUDGET", "HOURLY-RATE" ],
        required: true,
    },

    estimatedDuration: {
        type: Number,
        required: true,
    },

    projectSize: {
        type: String,
        enum: [ "SMALL", "MEDIUM", "LARGE" ],
    },

    projectStatus: {
        type: String,
        enum: [ "DRAFT", "POSTED", 'IN-PROGRESS', 'COMPLETED', 'CANCELLED' ],
        required: true,
    },

    experienceLevel: {
        type: String,
        enum: [ "ENTRY-LEVEL", "MID-LEVEL", "SENIOR" ],
        required: true,
    },

    workModel: {
        type: String,
        enum: [ "REMOTE", "HYBRID", "ON-SITE" ],
        required: true,
    },

    location: {
        type: locationModel.schema,
        required: false,
    },

    startDate: {
        type: Date,
        required: false,
    },

    endDate: {
        type: Date,
        required: false,
    },

} );

export default mongoose.model( "Project", ProjectSchema );
