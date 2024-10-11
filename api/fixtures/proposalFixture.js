import Proposal from "../models/proposalModel.js";

const proposalData = [
    {
        projectId: "64e14b11856613527727a280",
        freelancerId: "64e14b11856613527727a27e",
        proposalDescription: "I am a highly skilled web developer with 5+ years of experience in building responsive and user-friendly websites. I am confident that I can deliver a high-quality website that meets your requirements and exceeds your expectations.",
        hourlyRate: 50,
        estimatedTime: 100,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        projectId: "64e14b11856613527727a280",
        freelancerId: "64e14b11856613527727a27f",
        proposalDescription: "I have a strong understanding of modern web development technologies and a passion for creating beautiful and functional websites. I am confident that I can deliver a website that meets your specific needs and exceeds your expectations.",
        hourlyRate: 45,
        estimatedTime: 120,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        projectId: "64e14b11856613527727a281",
        freelancerId: "64e14b11856613527727a27e",
        proposalDescription: "I am a skilled mobile app developer with expertise in both Android and iOS platforms. I am confident that I can deliver a high-quality mobile app that meets your requirements and provides a seamless user experience.",
        hourlyRate: 60,
        estimatedTime: 150,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        projectId: "64e14b11856613527727a281",
        freelancerId: "64e14b11856613527727a27f",
        proposalDescription: "I am a passionate mobile app developer with a focus on creating user-centric and engaging apps. I am confident that I can deliver a mobile app that meets your specific needs and exceeds your expectations.",
        hourlyRate: 55,
        estimatedTime: 180,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

// I don't know if this is what you want luzak, but if it's to take random ids, i take the notifications and make for proposal - comunicação ruim em inglês
const seedProposals = async () => {
    try {
        const freelancerProfiles = await FreelancerProfile.find({}).lean();
        const projects = await Project.find({}).lean(); 
        const proposalData = [];

        for (let i = 0; i < 20; i++) {
            const randomFreelancer = freelancerProfiles[Math.floor(Math.random() * freelancerProfiles.length)];
            const randomFreelancerId = randomFreelancer._id;
            const randomProject = projects[Math.floor(Math.random() * projects.length)];
            const projectId = randomProject._id;

            proposalData.push({
                projectId: projectId, 
                freelancerId: randomFreelancerId,
                proposalDescription: "This is a sample proposal description.", // You can randomize this as needed
                hourlyRate: Math.floor(Math.random() * 50) + 25, // Random hourly rate between 25 and 75
                estimatedTime: Math.floor(Math.random() * 200) + 50, // Random estimated time between 50 and 250
                status: "PENDING",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await Proposal.deleteMany({});
        await Proposal.insertMany(proposalData);
        console.log("Proposal data seeded successfully!");
    } catch (error) {
        console.error("Error seeding Proposal data:", error);
    }
};

/*
const seedProposals = async () => {
    try {
        await Proposal.deleteMany({});
        await Proposal.insertMany(proposalData);
        console.log("Proposal data seeded successfully!");
    } catch (error) {
        console.error("Error seeding Proposal data:", error);
    }
};
*/
export default seedProposals;
// projectId: 64e14b11856613527727a280
// projectId: 64e14b11856613527727a281
// freelancerId: 64e14b11856613527727a27e
// freelancerId: 64e14b11856613527727a27f