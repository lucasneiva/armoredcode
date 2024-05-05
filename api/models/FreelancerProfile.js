import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Skill from './Skill.js';
import Technology from './Technology.js';
import Language from './Language.js';
import Location from './Location.js';

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

    skills: [ Skill.schema ],

    technologies: [ Technology.schema ],

    languages: [ Language.schema ],

    portfolio: [ PortfolioItemSchema ],

    education: [ EducationSchema ],

    certifications: [ CertificationSchema ],

    workExperience: [ WorkExperienceSchema ]

} );

export default mongoose.model( "FreelancerProfile", FreelancerProfileSchema );