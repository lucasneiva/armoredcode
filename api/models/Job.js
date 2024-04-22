const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { default: Technology } = require('./Technology');
const { default: JobCategory } = require('./JobCategory');
const { default: Skill } = require('./Skill');


const RequirementSchema = new Schema({
    requirementId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirementType: { type: String, enum: ["SOURCE_CODE", "DOCUMENTATION", "TEST_REPORT"] }
});

const JobSchema = new Schema({
    jobId: { type: Schema.Types.ObjectId, required: true },
    clientId: { type: Schema.Types.ObjectId, required: true },
    freelancerId: { type: Schema.Types.ObjectId },
    jobCategory: { type: JobCategory, required: true }, 
    skills: [Skill],
    technologies: [Technology],
    requirements: [RequirementSchema],
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    hourlyRateLowerBound: { type: Number },
    hourlyRateUpperBound: { type: Number },
    isFixedRate: { type: Boolean },
    fixedBudget: { type: Number },
    estimatedDuration: { type: Number },
    jobSize: { type: String, enum: ["SMALL", "MEDIUM", "LARGE"] },
    status: { type: String, enum: ["DRAFT", "POSTED"] },
    experienceLevel: { type: String, enum: ["ENTRY-LEVEL", "MID-LEVEL", "SENIOR"] },
    startDate: { type: Date },
    endDate: { type: Date },
    isRemote: { type: Boolean },
    city: { type: String, enum: ["SOROCABA", "VOTORANTIM", "ITU", "ARAÇOIABA DA SERRA", "PORTO FELIZ"] }
});

export default mongoose.model("Job", JobSchema);