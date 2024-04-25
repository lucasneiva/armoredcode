import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    skillName: { type: String, required: true },
    skillDescription: { type: String }
});

export default mongoose.model("Skill", SkillSchema);