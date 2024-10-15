import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotificationSchema = new Schema( {
    freelancerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    projectId: { // Opcional
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: false,
    },
    status: {
        type: String,
        enum: [ "PENDING", "ACCEPTED", "REJECTED" ],
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true } );

export default mongoose.model( 'Notification', NotificationSchema );