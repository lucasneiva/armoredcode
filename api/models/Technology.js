const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechnologySchema = new Schema({
    technologyId: { type: Schema.Types.ObjectId, required: true },
    technologyName: { type: String, required: true },
    technologyDescription: { type: String }
});

export default mongoose.model("Technology", TechnologySchema);