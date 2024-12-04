import clientProfile from "../models/clientProfileModel.js";
import Industry from "../models/industryModel.js";
import User from "../models/userModel.js";
import { clientProfiles } from "../utils/clientProfileData.js"

const seedClientProfiles = async () => {
    try {
        const industryDocs = await Industry.find( {} ).lean();
        const clientDocs = await User.find( { role: "CLIENT" } ).lean();

        //optimized
        for (let i = 0; i < clientProfiles.length; i++) {
            // Assign industryId (you might need to adjust the logic based on your data)
            clientProfiles[i].industryId = [industryDocs[i % industryDocs.length]._id]; 

            // Assign userId
            clientProfiles[i].userId = clientDocs[i % clientDocs.length]._id;
        }

        await clientProfile.deleteMany( {} );

        await clientProfile.insertMany( clientProfiles );

        console.log( "Client profile data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding client profile data:", error );
    }
};

export default seedClientProfiles;