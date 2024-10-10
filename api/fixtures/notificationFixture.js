import Notification from "../models/notificationModel.js";
import FreelancerProfile from "../models/freelancerProfileModel.js";
import Project from "../models/projectModel.js"; // Import Project model

const seedNotifications = async () => {
    try {
        const freelancerProfiles = await FreelancerProfile.find({}).lean();
        const projects = await Project.find({}).lean(); // Fetch projects
        const notificationData = [];

        for (let i = 0; i < 10; i++) {
            const randomFreelancer = freelancerProfiles[Math.floor(Math.random() * freelancerProfiles.length)];
            const randomFreelancerId = randomFreelancer._id;
            const randomProject = projects[Math.floor(Math.random() * projects.length)]; // Get a random project
            const clientIdFromProject = randomProject.clientId; // Extract client ID

            notificationData.push({
                freelancerProfileId: randomFreelancerId,
                clientId: clientIdFromProject, // Use client ID from project
                projectId: "64e14b11856613527727a280", // You might want to randomize this too
                message: "Com a mais elevada consideração, tomo a liberdade de dirigir-me a Vossa Senhoria para formular um convite à participação em um projeto que, por certo, se avolumará com o fulgor de vossa notável sapiência e talento.",
                read: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await Notification.deleteMany({});
        await Notification.insertMany(notificationData);
        console.log("Notification data seeded successfully!");
    } catch (error) {
        console.error("Error seeding Notification data:", error);
    }
};

export default seedNotifications;