import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: false
    }

} );

const WorkExperienceSchema = new Schema( {
    companyName: {
        type: String,
        required: true
    },

    jobTitle: {
        type: String,
        required: true,
        maxLength: 100,
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date
    },

    jobDescription: {
        type: String,
        maxLength: 500,
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
    },

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
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    profileImage: {
        type: String
    },

    firstName: {
        type: String,
        required: true,
        maxLength: 50,
    },

    lastName: {
        type: String,
        required: true,
        maxLength: 50,
    },

    specializationId: {
        type: Schema.Types.ObjectId,
        ref: "Specialization"
    },

    profileSummary: {
        type: String,
        required: false,
        maxLength: 1024,
    },

    experienceLevel: {
        type: String,
        enum: [ "JUNIOR", "MID-LEVEL", "SENIOR" ]
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

    skillIds: [ {
        type: Schema.Types.ObjectId,
        ref: "Skill"
    } ],

    portfolioItems: [ PortfolioItemSchema ],

    educations: [ EducationSchema ],

    certifications: [ CertificationSchema ],

    workExperiences: [ WorkExperienceSchema ],

}, { timestamps: true } );

export default mongoose.model( "FreelancerProfile", FreelancerProfileSchema );