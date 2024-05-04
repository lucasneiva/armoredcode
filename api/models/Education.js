import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CertificationSchema = new Schema( {
    name: {
        type: String,
        required: true
    },

    issuingOrganization: {
        type: String,
        required: true
    },

    issueDate: {
        type: Date,
        required: true
    }

} );

export default mongoose.model( "Certification", CertificationSchema );