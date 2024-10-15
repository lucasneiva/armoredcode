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

        freelancerProfiles[7].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[7].skillIds = [skillDocs[11]._id, skillDocs[12]._id, skillDocs[16]._id];
        freelancerProfiles[7].userId = freelancerDocs[7]._id;

        freelancerProfiles[8].specializationId = [specializationDocs[5]._id];
        freelancerProfiles[8].skillIds = [skillDocs[6]._id, skillDocs[7]._id];
        freelancerProfiles[8].userId = freelancerDocs[8]._id;

        freelancerProfiles[9].specializationId = [specializationDocs[2]._id];
        freelancerProfiles[9].skillIds = [skillDocs[9]._id, skillDocs[22]._id, skillDocs[23]._id];
        freelancerProfiles[9].userId = freelancerDocs[9]._id;
        
        freelancerProfiles[10].specializationId = [specializationDocs[12]._id];
        freelancerProfiles[10].skillIds = [skillDocs[7]._id, skillDocs[31]._id];
        freelancerProfiles[10].userId = freelancerDocs[10]._id;
        /*
        freelancerProfiles[11].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[11].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[11].userId = freelancerDocs[11]._id;

        freelancerProfiles[12].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[12].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[12].userId = freelancerDocs[12]._id;

        freelancerProfiles[13].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[13].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[13].userId = freelancerDocs[13]._id;

        freelancerProfiles[14].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[14].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[14].userId = freelancerDocs[14]._id;

        freelancerProfiles[15].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[15].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[15].userId = freelancerDocs[15]._id;

        freelancerProfiles[16].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[16].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[16].userId = freelancerDocs[16]._id;

        freelancerProfiles[17].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[17].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[17].userId = freelancerDocs[17]._id;

        freelancerProfiles[18].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[18].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[18].userId = freelancerDocs[18]._id;

        freelancerProfiles[19].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[19].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[19].userId = freelancerDocs[19]._id;

        freelancerProfiles[20].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[20].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[20].userId = freelancerDocs[20]._id;

        freelancerProfiles[21].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[21].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[21].userId = freelancerDocs[21]._id;

        freelancerProfiles[22].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[22].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[22].userId = freelancerDocs[22]._id;

        freelancerProfiles[23].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[23].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[23].userId = freelancerDocs[23]._id;

        freelancerProfiles[24].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[24].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[24].userId = freelancerDocs[24]._id;

        freelancerProfiles[25].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[25].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[25].userId = freelancerDocs[25]._id;

        freelancerProfiles[26].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[26].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[26].userId = freelancerDocs[26]._id;

        freelancerProfiles[27].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[27].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[27].userId = freelancerDocs[27]._id;

        freelancerProfiles[28].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[28].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[28].userId = freelancerDocs[28]._id;

        freelancerProfiles[29].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[29].skillIds = [skillDocs[0]._id, skillDocs[0]._id, skillDocs[0]._id];
        freelancerProfiles[29].userId = freelancerDocs[29]._id;
        */

        await FreelancerProfile.deleteMany({});

        await FreelancerProfile.insertMany(freelancerProfiles);

        console.log("Freelancer profile data seeded successfully!");
    } catch (error) {
        console.error("Error seeding Freelancer profile data:", error);
    }
};

export default seedFreelancerProfiles;