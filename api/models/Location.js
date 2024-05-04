import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LocationSchema = new Schema( {
    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        default: "SP"
    },

    country: {
        type: String,
        default: "Brazil"
    }
} );

export default mongoose.model( "Location", LocationSchema );