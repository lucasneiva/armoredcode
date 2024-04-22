const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobCategorySchema = new Schema({
    categoryId: { type: Schema.Types.ObjectId, required: true },
    categoryName: { type: String, required: true },
    categoryDescription: { type: String }
});

export default mongoose.model("JobCategory", UserSchema);