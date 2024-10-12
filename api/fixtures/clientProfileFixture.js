import clientProfile from "../models/clientProfileModel.js";
import Industry from "../models/industryModel.js";
import User from "../models/userModel.js";

const clientProfiles = [
    {
        companyName: "TechSol Ltda.",
        companyDescription: "TechSol Ltda. is a dynamic and innovative software company specializing in providing cutting-edge solutions for small businesses. Our team of experienced developers and designers are passionate about creating user-friendly and efficient software that helps businesses streamline their operations, improve productivity, and achieve their goals. We offer a wide range of services, including custom software development, web application development, mobile app development, and cloud-based solutions. Our commitment to quality, affordability, and customer satisfaction has made us a trusted partner for businesses of all sizes.",
        companySize: "SMALL",
        profileImage: null,
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
        companyDescription: "Metalúrgica Sorocabana S.A. is a renowned and established manufacturer of high-precision metal parts and components. With decades of experience in the industry, we have built a reputation for delivering exceptional quality, reliability, and innovation. Our state-of-the-art facilities and skilled workforce enable us to produce a wide range of metal parts for various industries, including automotive, aerospace, construction, and machinery. We are committed to meeting the stringent requirements of our customers and exceeding their expectations through continuous improvement and a strong focus on customer satisfaction.",
        companySize: "MEDIUM",
        profileImage: null,
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