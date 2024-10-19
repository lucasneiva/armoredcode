import clientProfile from "../models/clientProfileModel.js";
import Industry from "../models/industryModel.js";
import User from "../models/userModel.js";
import { clientProfiles } from "../utils/clientProfileData.js"

const seedClientProfiles = async () => {
    try {
        const industryDocs = await Industry.find( {} ).lean();
        const clientDocs = await User.find( { role: "CLIENT" } ).lean();

        clientProfiles[ 0 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 0 ].userId = clientDocs[ 0 ]._id;

        clientProfiles[ 1 ].industryId = industryDocs[ 5 ];
        clientProfiles[ 1 ].userId = clientDocs[ 1 ]._id;

        clientProfiles[ 2 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 2 ].userId = clientDocs[ 2 ]._id;

        clientProfiles[ 3 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 3 ].userId = clientDocs[ 3 ]._id;
        
        clientProfiles[ 4 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 4 ].userId = clientDocs[ 4 ]._id;

        clientProfiles[ 5 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 5 ].userId = clientDocs[ 5 ]._id;

        clientProfiles[ 6 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 6 ].userId = clientDocs[ 6 ]._id;

        clientProfiles[ 7 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 7 ].userId = clientDocs[ 7 ]._id;

        clientProfiles[ 8 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 8 ].userId = clientDocs[ 8 ]._id;

        clientProfiles[ 9 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 9 ].userId = clientDocs[ 9 ]._id;

        clientProfiles[ 10 ].industryId = industryDocs[ 18 ];
        clientProfiles[ 10 ].userId = clientDocs[ 10 ]._id;

        clientProfiles[ 11 ].industryId = industryDocs[ 8 ];
        clientProfiles[ 11 ].userId = clientDocs[ 11 ]._id;

        clientProfiles[ 12 ].industryId = industryDocs[ 1 ];
        clientProfiles[ 12 ].userId = clientDocs[ 12 ]._id;

        clientProfiles[ 13 ].industryId = industryDocs[ 2 ];
        clientProfiles[ 13 ].userId = clientDocs[ 13 ]._id;

        clientProfiles[ 14 ].industryId = industryDocs[ 11 ];
        clientProfiles[ 14 ].userId = clientDocs[ 14 ]._id;

        await clientProfile.deleteMany( {} );

        await clientProfile.insertMany( clientProfiles );

        console.log( "Client profile data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding client profile data:", error );
    }
};

export default seedClientProfiles;