import clientProfile from "../models/clientProfileModel.js";
import Industry from "../models/industryModel.js";
import User from "../models/userModel.js";

const clientProfiles = [
    {
        companyName: "TechSol Ltda.",
        companyDescription: "Innovative software solutions for small businesses.",
        companySize: "SMALL",
        logo: "https://www.techsol.com.br/logo.png",
        industryId: "645b6c612345678901234567",
        website: "https://www.techsol.com.br",
        location: {
            streetAddress: "Rua XV de Novembro, 123",
            city: "SOROCABA",
            cep: "18035-000",
            neighborhood: "Centro",
        }
    },

    {
        companyName: "Metalúrgica Sorocabana S.A.",
        companyDescription: "Leading manufacturer of precision metal parts.",
        companySize: "MEDIUM",
        logo: "https://www.metalsocabana.com.br/logo.jpg",
        industryId: "645b6c612345678901234568",
        website: "https://www.metalsocabana.com.br",
        location: {
            streetAddress: "Avenida Independência, 456",
            city: "SOROCABA",
            cep: "18087-123",
            neighborhood: "Centro",
        }
    }

];

const seedClientProfiles = async () => {
    try {
        const industryDocs = await Industry.find( {} ).lean();
        const clientDocs = await User.find( { role: "CLIENT" } ).lean();

        clientProfiles[ 0 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 0 ].userId = clientDocs[ 0 ]._id;

        clientProfiles[ 1 ].industryId = industryDocs[ 1 ];
        clientProfiles[ 1 ].userId = clientDocs[ 1 ]._id;

        await clientProfile.deleteMany( {} );

        await clientProfile.insertMany( clientProfiles );

        console.log( "Client profile data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding client profile data:", error );
    }
};

export default seedClientProfiles;