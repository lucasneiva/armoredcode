import FreelancerProfile from "../models/freelancerProfileModel.js";
import Specialization from "../models/specializationModel.js";
import Skill from "../models/skillModel.js";
import User from "../models/userModel.js";
import { freelancerProfiles } from "../utils/freelancerProfileData.js";

const seedFreelancerProfiles = async () => {
    try {

        const specializationDocs = await Specialization.find({}).lean();
        const skillDocs = await Skill.find({}).lean();
        const freelancerDocs = await User.find({ role: "FREELANCER" }).lean();

        //optimized
        for (let i = 0; i < freelancerProfiles.length; i++) {
            // Assign specializationId (you might need to adjust the logic based on your data)
            freelancerProfiles[i].specializationId = [specializationDocs[i % specializationDocs.length]._id]; 

            // Assign skillIds (you might need to adjust the logic based on your data)
            freelancerProfiles[i].skillIds = [
                skillDocs[i % skillDocs.length]._id, 
                skillDocs[(i + 1) % skillDocs.length]._id 
                // ... add more skills if needed
            ];

            // Assign userId
            freelancerProfiles[i].userId = freelancerDocs[i % freelancerDocs.length]._id;
        }

        await FreelancerProfile.deleteMany({});
        await FreelancerProfile.insertMany(freelancerProfiles);

        console.log("Freelancer profile data seeded successfully!");
    } catch (error) {
        console.error("Error seeding Freelancer profile data:", error);
    }
};

export default seedFreelancerProfiles;