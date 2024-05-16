import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProjectCategorySchema = new Schema( {
    categoryName: {
        type: String,
        required: true,
        maxLength: 50,
    },

    categoryDescription: {
        type: String,
        maxLength: 500,
    }

} );

export default mongoose.model( "ProjectCategory", ProjectCategorySchema );