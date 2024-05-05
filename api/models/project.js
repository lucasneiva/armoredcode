import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
        required: true
    },

    freelancerId: {
        type: Schema.Types.ObjectId
    },

    projectCategory: {
        type: Schema.Types.ObjectId,
        ref: "ProjectCategory",
        required: true
    },

    skills: [{
        type: Schema.Types.ObjectId,
        ref: "Skill"
    }],

    technologies: [{
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
        enum: [ "SMALL", "MEDIUM", "LARGE" ]
    },

    status: {
        type: String,
        enum: [ "DRAFT", "POSTED" ]
    },

    experienceLevel: {
        type: String,
        enum: [ "ENTRY-LEVEL", "MID-LEVEL", "SENIOR" ]
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
        enum: [ "SOROCABA", "VOTORANTIM", "ITU", "ARAÇOIABA DA SERRA", "PORTO FELIZ" ]
    }

} );

export default mongoose.model( "Project", ProjectSchema );
