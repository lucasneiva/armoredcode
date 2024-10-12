import Project from "../models/projectModel.js";
import Skill from "../models/skillModel.js";
import User from "../models/userModel.js";
import ProjectCategory from "../models/projectCategoryModel.js";
import Location from "../models/locationModel.js";
import { faker } from '@faker-js/faker';

const generateLocationData = () => {
    const cities = [
        "SOROCABA",
        "ITU",
        "SALTO DE PIRAPORA",
        "SÃO ROQUE",
        "IPERÓ",
        "CAPELA DO ALTO",
        "VOTORANTIM",
        "ARAÇOIABA DA SERRA",
        "BOITUVA",
        "CERQUILHO",
        "TATUÍ"
    ];

    return {
        streetAddress: faker.location.streetAddress(),
        neighborhood: faker.location.county(),
        city: faker.helpers.arrayElement( cities ),
        state: "SP",
        cep: "99999-999",
        country: "BRAZIL"
    };
};

const generateProjectData = () => {
    const pricingTypes = [ "BUDGET", "HOURLY_RATE" ];
    const projectSizes = [ "SMALL", "MEDIUM", "LARGE" ];
    const experienceLevels = [ "ENTRY-LEVEL", "MID-LEVEL", "SENIOR" ];
    const workModels = [ "REMOTE", "HYBRID", "ON_SITE" ];
    const statusTypes = [ "DRAFT", "POSTED" ];

    // Generate min value first
    const minBudget = faker.finance.amount( { min: 500, max: 10000 } );
    const minHourlyRate = faker.finance.amount( { min: 500, max: 10000 } );

    return {
        projectTitle: faker.lorem.words( 5 ),
        projectDescription: faker.lorem.paragraph(),
        pricingType: faker.helpers.arrayElement( pricingTypes ),
        projectBudget: {
            min: minBudget,
            // Ensure max is greater than or equal to min
            max: faker.finance.amount( { min: parseFloat(minBudget), max: 15000 } ), 
            currency: "R$"
        },
        projectHourlyRate: {
            min: minHourlyRate,
            // Ensure max is greater than or equal to min
            max: faker.finance.amount( { min: parseFloat(minHourlyRate), max: 15000 } ),
            currency: "R$"
        },
        estimatedDuration: faker.number.int({ min: 1, max: 1095 }), // Changed to be between 1 and 1095
        projectSize: faker.helpers.arrayElement( projectSizes ),
        experienceLevel: faker.helpers.arrayElement( experienceLevels ),
        workModel: faker.helpers.arrayElement( workModels ),
        location: generateLocationData(),
        projectStatus: faker.helpers.arrayElement( statusTypes )
    };
};

const seedProjects = async ( count = 10 ) => {
    try {
        const skillDocs = await Skill.find( {} ).lean();
        const projectCategoryDocs = await ProjectCategory.find( {} ).lean();
        const clientDocs = await User.find( { role: "CLIENT" } ).lean();

        const projects = [];
        for ( let i = 0; i < count; i++ ) {
            const projectData = generateProjectData();
            projects.push( {
                ...projectData,
                projectCategoryId: faker.helpers.arrayElement( projectCategoryDocs )._id,
                clientId: faker.helpers.arrayElement( clientDocs )._id,
                skillIds: faker.helpers.arrayElements(
                    skillDocs.map( ( skill ) => skill._id ),
                    { min: 1, max: 3 }
                ),
                
            } );
        }

        await Project.deleteMany( {} );
        await Project.insertMany( projects );
        console.log( `Seeded ${count} project documents successfully!` );
    } catch ( error ) {
        console.error( "Error seeding project data:", error );
    }
};

export default seedProjects;