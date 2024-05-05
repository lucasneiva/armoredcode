import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Location from './Location.js';

const ClientProfileSchema = new Schema( {
    companyName: {
        type: String,
        required: true
    },

    companyDescription: {
        type: String
    },

    companySize: {
        type: String,
        enum: [ "SMALL", "MEDIUM", "LARGE" ],
        required: true
    },
    
    logo: {
        type: String
    },

    industry: {
        type: String,
        required: true
    },

    website: {
        type: String
    },

    location: {
        type: Location.schema,
    }

} );

export default mongoose.model( "ClientProfile", ClientProfileSchema );