import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import Project from "../models/projectModel.js";

const seedNotifications = async () => {
    try {
        const freelancerProfiles = await User.find( { role: "FREELANCER" } ).lean();
        const projects = await Project.find( {} ).lean();
        const notificationData = [];

        for ( let i = 0; i < 25; i++ ) {
            const randomFreelancer = freelancerProfiles[ Math.floor( Math.random() * freelancerProfiles.length ) ];
            const randomFreelancerId = randomFreelancer._id;
            const randomProject = projects[ Math.floor( Math.random() * projects.length ) ];
            const clientIdFromProject = randomProject.clientId;

            notificationData.push( {
                freelancerId: randomFreelancerId,
                clientId: clientIdFromProject,
                projectId: randomProject._id, 
                message: "Com a mais elevada consideração, tomo a liberdade de dirigir-me a Vossa Senhoria para formular um convite à participação em um projeto que, por certo, se avolumará com o fulgor de vossa notável sapiência e talento.",
                status: "PENDING",
                read: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            } );
        }

        await Notification.deleteMany( {} );
        await Notification.insertMany( notificationData );
        console.log( "Notification data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding Notification data:", error );
    }
};

export default seedNotifications;