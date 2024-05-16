import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Location from './locationModel.js';

const ClientProfileSchema = new Schema( {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    companyName: {
        type: String,
        maxLength: 100,
        unique: true,
        required: true
    },

    companyDescription: {
        type: String,
        maxLength: 500,
        required: true ,
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

    website: {
        type: String
    },

    location: {
        type: Location.schema,
    }

}, { timestamps: true } );

export default mongoose.model( "ClientProfile", ClientProfileSchema );