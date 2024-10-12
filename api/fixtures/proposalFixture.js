import Proposal from "../models/proposalModel.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

const seedProposals = async () => {
    try {

        // Find freelancers (users with role 'freelancer')
        const freelancers = await User.find( { role: 'FREELANCER' } ).lean();
        const projects = await Project.find( {} ).lean();
        const proposalData = [];

        for ( let i = 0; i < 20; i++ ) {
            const randomFreelancer = freelancers[ Math.floor( Math.random() * freelancers.length ) ];
            const randomFreelancerId = randomFreelancer._id; // This is the User ID
            const randomProject = projects[ Math.floor( Math.random() * projects.length ) ];
            const projectId = randomProject._id;
            const clientId = randomProject.clientId;

            proposalData.push( {
                projectId: projectId,
                freelancerId: randomFreelancerId,
                clientId: clientId, 
                coverLetter: "Com o mais profundo respeito e consideração, venho, por meio desta, manifestar meu interesse em colaborar com Vosso nobre Projeto!. Sou profissional experiente e dedicado, preparado para prestar serviços de elevada qualidade, sempre em estrita conformidade com os mais altos padrões de excelência e pontualidade.",
                pricingType: "HOURLY_RATE",
                proposedHourlyRate: Math.floor( Math.random() * 50 ) + 25, // Random hourly rate between 25 and 75
                estimatedDuration: Math.floor( Math.random() * 200 ) + 50, // Random estimated time between 50 and 250
                status: "PENDING",
                createdAt: new Date(),
                updatedAt: new Date(),
            } );
        }

        await Proposal.deleteMany( {} );
        await Proposal.insertMany( proposalData );
        console.log( "Proposal data seeded successfully!" );

    } catch ( error ) {
        console.error( "Error seeding Proposal data:", error );
    }
};

export default seedProposals;
