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
    {
        projectId: "projectId",
        freelancerId: "freelancerId",
        proposalDescription: "description of the proposal.",
        hourlyRate: 65,
        estimatedTime: 165,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const seedProposals = async () => {
    try {
        await Proposal.deleteMany({});
        await Proposal.insertMany(proposalData);
        console.log("Proposal data seeded successfully!");
    } catch (error) {
        console.error("Error seeding Proposal data:", error);
    }
};

export default seedProposals;
// projectId: 64e14b11856613527727a280
// projectId: 64e14b11856613527727a281
// freelancerId: 64e14b11856613527727a27e
// freelancerId: 64e14b11856613527727a27f