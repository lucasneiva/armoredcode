import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Location from './locationModel.js';

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

    industryId: {
        type: Schema.Types.ObjectId,
        ref: "Industry",
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    website: {
        type: String
    },

    location: {
        type: Location.schema,
    }

}, { timestamps: true } );

export default mongoose.model( "ClientProfile", ClientProfileSchema );