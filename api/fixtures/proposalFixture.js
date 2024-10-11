import Proposal from "../models/proposalModel.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

const proposalData = [
    {
        projectId: "64e14b11856613527727a280",
        freelancerId: "64e14b11856613527727a27e",
        coverLetter: "I am a highly skilled web developer with 5+ years of experience in building responsive and user-friendly websites. I am confident that I can deliver a high-quality website that meets your requirements and exceeds your expectations.",
        pricingType: "HOURLY_RATE",
        proposedHourlyRate: 50,
        estimatedDuration: 100,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        projectId: "64e14b11856613527727a280",
        freelancerId: "64e14b11856613527727a27f",
        coverLetter: "I have a strong understanding of modern web development technologies and a passion for creating beautiful and functional websites. I am confident that I can deliver a website that meets your specific needs and exceeds your expectations.",
        pricingType: "HOURLY_RATE",
        proposedHourlyRate: 45,
        estimatedDuration: 120,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        projectId: "64e14b11856613527727a281",
        freelancerId: "64e14b11856613527727a27e",
        coverLetter: "I am a skilled mobile app developer with expertise in both Android and iOS platforms. I am confident that I can deliver a high-quality mobile app that meets your requirements and provides a seamless user experience.",
        pricingType: "HOURLY_RATE",
        proposedHourlyRate: 60,
        estimatedDuration: 150,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        projectId: "64e14b11856613527727a281",
        freelancerId: "64e14b11856613527727a27f",
        coverLetter: "I am a passionate mobile app developer with a focus on creating user-centric and engaging apps. I am confident that I can deliver a mobile app that meets your specific needs and exceeds your expectations.",
        proposedHourlyRate: 55,
        estimatedDuration: 180,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

// I don't know if this is what you want luzak, but if it's to take random ids, i take the notifications and make for proposal - comunicação ruim em inglês
const seedProposals = async () => {
    try {
        // Find freelancers (users with role 'freelancer')
        const freelancers = await User.find({ role: 'FREELANCER' }).lean();
        const projects = await Project.find({}).lean();
        const proposalData = [];

        //console.log("Freelancers found:", freelancers);
        //console.log("Number of freelancers:", freelancers.length);

        for (let i = 0; i < 20; i++) {
            const randomFreelancer = freelancers[Math.floor(Math.random() * freelancers.length)];
            const randomFreelancerId = randomFreelancer._id; // This is the User ID
            const randomProject = projects[Math.floor(Math.random() * projects.length)];
            const projectId = randomProject._id;
            // Get the clientId from the project
            const clientId = randomProject.clientId; 

            proposalData.push({
                projectId: projectId,
                freelancerId: randomFreelancerId,
                clientId: clientId, // Add the clientId to the proposal data
                coverLetter: "This is a sample proposal description.", // You can randomize this as needed
                pricingType: "HOURLY_RATE",
                proposedHourlyRate: Math.floor(Math.random() * 50) + 25, // Random hourly rate between 25 and 75
                estimatedDuration: Math.floor(Math.random() * 200) + 50, // Random estimated time between 50 and 250
                status: "PENDING",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await Proposal.deleteMany({});
        await Proposal.insertMany(proposalData);
        console.log("Proposal data seeded successfully!");
        //console.log("Proposal data:", proposalData);
    } catch (error) {
        console.error("Error seeding Proposal data:", error);
    }
};

export default seedProposals;
