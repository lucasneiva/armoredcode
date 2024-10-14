import Notification from '../models/notificationModel.js';
import Project from '../models/projectModel.js';
import FreelancerProfile from '../models/freelancerProfileModel.js';
import ClientProfile from '../models/clientProfileModel.js';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';
import { handleValidationError } from '../utils/handleValidationError.js';

export const createNotification = async ( req, res ) => {
    try {
        const { projectId, freelancerProfileId, message } = req.body;

        // Validate input
        if ( !projectId || !freelancerProfileId ) {
            return res.status( 400 ).json( { error: 'Missing required fields' } );
        }

        // Find the project and freelancerProfile
        const project = await Project.findById( projectId );
        const freelancerProfile = await FreelancerProfile.findById( freelancerProfileId );

        if ( !project || !freelancerProfile ) {
            return res.status( 404 ).json( { error: 'Project or freelancerProfile not found' } );
        }

        // Find the clientProfile who created the notification
        const clientId = await ClientProfile.find( {userId : req.user.id} )._id;

        // Create the notification
        const notification = new Notification( {
            freelancerProfileId,
            clientId: req.user.id, // deve ser id perfil kkkk arrumar
            projectId,
            message,
            read: false,
        } );

        await notification.save();

        res.status( 201 ).json( { message: 'Notification created successfully', notification } );
    } catch ( error ) {
        console.error( error );
        handleValidationError( error, next );
    }
};

export const getFreelancerNotifications = async ( req, res ) => {
    try {
        const { freelancerProfileId } = req.params;

        // Find all notifications for the freelancerProfile
        const notifications = await Notification.find( { freelancerProfileId } ).sort( { createdAt: -1 } );

        res.status( 200 ).json( notifications );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { error: 'Failed to fetch notifications' } );
    }
};

export const markNotificationAsRead = async ( req, res ) => {
    try {
        const { id } = req.params;

        // Find the notification
        const notification = await Notification.findById( id );

        if ( !notification ) {
            return res.status( 404 ).json( { error: 'Notification not found' } );
        }

        // Mark the notification as read
        notification.read = true;
        await notification.save();

        res.status( 200 ).json( { message: 'Notification marked as read' } );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { error: 'Failed to mark notification as read' } );
    }
};
