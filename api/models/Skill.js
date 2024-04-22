const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    skillId: { type: Schema.Types.ObjectId, required: true },
    skillName: { type: String, required: true },
    skillDescription: { type: String }
});

export default mongoose.model("Skill", SkillSchema);