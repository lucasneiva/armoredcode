import mongoose from "mongoose";
const Schema = mongoose.Schema;

const JobCategorySchema = new Schema({
    categoryName: { type: String, required: true },
    categoryDescription: { type: String }
});

export default mongoose.model("JobCategory", JobCategorySchema);