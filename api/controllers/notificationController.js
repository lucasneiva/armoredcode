import Notification from '../models/notificationModel.js';
import Project from '../models/projectModel.js';
import FreelancerProfile from '../models/freelancerProfileModel.js';
import ClientProfile from '../models/clientProfileModel.js';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';
import { handleValidationError } from '../utils/handleValidationError.js';

//modified
export const createNotification = async (req, res, next) => {
    try {
        const { projectId, freelancerId, clientId, message } = req.body;

        // Validate input
        if (!projectId || !freelancerId) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Find the project and freelancerProfile
        const project = await Project.findById(projectId);
        // In createNotification function
        const freelancerProfile = await FreelancerProfile.findOne({ userId: freelancerId });


        if (!project || !freelancerProfile) {
            return res.status(404).json({ success: false, message: 'Project or freelancerProfile not found' });
        }

        // Find the clientProfile who created the notification
        //const clientProfile = await ClientProfile.findOne({ userId: req.user.id }); // Use findOne instead of find
        const clientProfile = await ClientProfile.findOne({ userId: clientId });

        if (!clientProfile) {
            return res.status(404).json({ success: false, message: 'Client profile not found' });
        }

        // Create the notification
        const notification = new Notification({
            freelancerId,
            clientId,
            projectId,
            message,
            read: false,
            status: "PENDING",
        });

        await notification.save();

        res.status(201).json({ success: true, message: 'Notification created successfully', notification });
    } catch (error) {
        console.error(error.message);
        handleValidationError(error, next);
    }
};
/*
export const createNotification = async ( req, res ) => {
    try {
        const { projectId, freelancerId, message } = req.body;

        // Validate input
        if ( !projectId || !freelancerId ) {
            return res.status( 400 ).json( { error: 'Missing required fields' } );
        }

        // Find the project and freelancerProfile
        const project = await Project.findById( projectId );
        const freelancerProfile = await FreelancerProfile.findById( freelancerId );

        if ( !project || !freelancerProfile ) {
            return res.status( 404 ).json( { error: 'Project or freelancerProfile not found' } );
        }

        // Find the clientProfile who created the notification
        const clientId = await ClientProfile.find( {userId : req.user.id} )._id;

        // Create the notification
        const notification = new Notification( {
            freelancerId,
            clientId: req.user.id, // deve ser id perfil kkkk arrumar
            projectId,
            message,
            read: false,
        } );

        await notification.save();

        res.status( 201 ).json( { message: 'Notification created successfully', notification } );
    } catch ( error ) {
        console.error( error.message );
        handleValidationError( error, next );
    }
};
*/

//created
export const getInviteById = async (req, res) => {
    try {
        const notificationId = req.params.id;

        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({ success: false, message: 'Invite not found' });
        }

        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch invite details' });
    }
};

export const getFreelancerNotifications = async (req, res) => {
    try {
        const { freelancerId } = req.params;

        // Find all notifications for the freelancerProfile
        const notifications = await Notification.find({ freelancerId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: notifications }); // Wrap in data object
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

export const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the notification
        const notification = await Notification.findById(id);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        // Mark the notification as read
        notification.isRead = true; // modified
        await notification.save();

        // Return a consistent success response
        res.status(200).json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};
