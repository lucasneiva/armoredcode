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

        freelancerProfiles[0].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[0].skillIds = [skillDocs[0]._id, skillDocs[1]._id];
        freelancerProfiles[0].userId = freelancerDocs[0]._id;

        freelancerProfiles[1].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[1].skillIds = [skillDocs[2]._id, skillDocs[3]._id];
        freelancerProfiles[1].userId = freelancerDocs[1]._id;

        freelancerProfiles[2].specializationId = [specializationDocs[3]._id];
        freelancerProfiles[2].skillIds = [skillDocs[8]._id, skillDocs[2]._id];
        freelancerProfiles[2].userId = freelancerDocs[2]._id;

        freelancerProfiles[3].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[3].skillIds = [skillDocs[11]._id, skillDocs[12]._id];
        freelancerProfiles[3].userId = freelancerDocs[3]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[5].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[5].skillIds = [skillDocs[9]._id, skillDocs[22]._id];
        freelancerProfiles[5].userId = freelancerDocs[5]._id;

        freelancerProfiles[6].specializationId = [specializationDocs[7]._id];
        freelancerProfiles[6].skillIds = [skillDocs[1]._id, skillDocs[28]._id];
        freelancerProfiles[6].userId = freelancerDocs[6]._id;

        /*
        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;
        
        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;

        freelancerProfiles[4].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[4].skillIds = [skillDocs[1]._id, skillDocs[8]._id, skillDocs[15]._id];
        freelancerProfiles[4].userId = freelancerDocs[4]._id;
        */

        await FreelancerProfile.deleteMany({});

        await FreelancerProfile.insertMany(freelancerProfiles);

        console.log("Freelancer profile data seeded successfully!");
    } catch (error) {
        console.error("Error seeding Freelancer profile data:", error);
    }
};

export default seedFreelancerProfiles;