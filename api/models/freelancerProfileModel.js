import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Skill from './skillModel.js';
import Technology from './technologyModel.js';
import Language from './languageModel.js';
import Location from './locationModel.js';

const EducationSchema = new Schema( {
    degreeName: {
        type: String,
        required: true
    },

    fieldOfStudy: {
        type: String,
        required: true
    },

    institution: {
        type: String,
        required: true
    },

    graduationYear: {
        type: Number,
        required: true
    }

} );

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

const CertificationSchema = new Schema( {
    name: {
        type: String,
        required: true
    },

    issuingOrganization: {
        type: String,
        required: true
    },

    issueDate: {
        type: Date,
        required: true
    }

} );

const PortfolioItemSchema = new Schema( {
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    url: {
        type: String,
        required: true,
    }

} );

const FreelancerProfileSchema = new Schema( {
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    specializations: [ {
        type: Schema.Types.ObjectId,
        ref: "Specialization"
    } ],

    profileSummary: {
        type: String
    },

    profileImage: {
        type: String
    },

    experienceLevel: {
        type: String,
        enum: [ "ENTRY-LEVEL", "MID-LEVEL", "SENIOR" ]
    },

    hourlyRate: {
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

    isAvailable: {
        type: Boolean,
        default: true
    },

    location: Location.schema,

    skills: [ {
        type: Schema.Types.ObjectId,
        ref: "Skill"
    } ],

    technologies: [ {
        type: Schema.Types.ObjectId,
        ref: "Technology"
    } ],

    languages: [ {
        type: Schema.Types.ObjectId,
        ref: "Language"
    } ],

    portfolio: [ PortfolioItemSchema ],

    education: [ EducationSchema ],

    certifications: [ CertificationSchema ],

    workExperience: [ WorkExperienceSchema ]

}, { timestamps: true } );

export default mongoose.model( "FreelancerProfile", FreelancerProfileSchema );