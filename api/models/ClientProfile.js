import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Location from './Location';

const ClientProfileSchema = new Schema( {
    companyName: {
        type: String,
        required: true
    },

    companySize: {
        type: String,
        enum: [ "SMALL", "MEDIUM", "LARGE" ],
        required: true
    },

    industry: {
        type: String,
        required: true
    },

    companyDescription: {
        type: String
    },

    website: {
        type: String
    },

    logo: {
        type: String
    },

    location: {
        type: Location.schema,
    }

} );

export default mongoose.model( "ClientProfile", ClientProfileSchema ); 