import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TechnologySchema = new Schema({
    technologyName: { type: String, required: true },
    technologyDescription: { type: String }
});

export default mongoose.model("Technology", TechnologySchema);