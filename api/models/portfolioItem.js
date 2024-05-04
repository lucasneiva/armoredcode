import mongoose from "mongoose";

const PortfolioItemSchema = new Schema( {
    title: String,
    description: String,
    url: String,
} );

export default mongoose.model("PortfolioItem", PortfolioItemSchema);