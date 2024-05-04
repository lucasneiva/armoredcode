import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export default mongoose.model( "PortfolioItem", PortfolioItemSchema );