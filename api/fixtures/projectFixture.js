import Project from "../models/projectModel.js";
import Skill from "../models/skillModel.js";
import User from "../models/userModel.js";
import ProjectCategory from "../models/projectCategoryModel.js";

const projects = [
    {
        projectCategoryId: null,
        skillIds: [],
        projectTitle: "E-commerce Website Development",
        projectDescription: "Seeking a skilled developer to build a modern and responsive e-commerce website with secure payment integration.",
        pricingType: "BUDGET",
        projectBudget: {
            min: 5000,
            max: 10000,
            currency: "R$"
        },
        estimatedDuration: 8,
        projectSize: "MEDIUM",
        experienceLevel: "MID-LEVEL",
        workModel: "REMOTE",
        location: {
            city: "SOROCABA",
            CEP: "19180000"
        }
    },

    {
        projectCategoryId: null,
        skillIds: [],
        projectTitle: "Mobile App Development (Android)",
        projectDescription: "Need an experienced Android developer to create a feature-rich mobile application with a focus on performance and user experience.",
        pricingType: "HOURLY_RATE",
        projectHourlyRate: {
            min: 80,
            max: 120,
            currency: "R$"
        },
        estimatedDuration: 200,
        projectSize: "LARGE",
        experienceLevel: "SENIOR",
        workModel: "HYBRID",
        location: {
            city: "VOTORANTIM",
            CEP: "18110-280"
        }
    },

];

const seedProjects = async () => {
    try {

        const skillDocs = await Skill.find( {} ).lean();
        const projectCategoryDocs = await ProjectCategory.find( {} ).lean();
        const clientDocs = await User.find( { role: "CLIENT" } ).lean();

        projects[ 0 ].projectCategoryId = projectCategoryDocs[ 0 ]._id;
        projects[ 0 ].clientId = clientDocs[ 0 ]._id;
        projects[ 0 ].skillIds = [ skillDocs[ 0 ]._id, skillDocs[ 1 ]._id ];

        projects[ 1 ].projectCategoryId = projectCategoryDocs[ 1 ]._id;
        projects[ 1 ].clientId = clientDocs[ 1 ]._id;
        projects[ 1 ].skillIds = [ skillDocs[ 2 ]._id, skillDocs[ 3 ]._id ];

        await Project.deleteMany( {} );

        await Project.insertMany( projects );

        console.log( "Project data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding Freelancer profile data:", error );
    }
};

export default seedProjects;