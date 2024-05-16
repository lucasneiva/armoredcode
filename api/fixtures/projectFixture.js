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
        streetAddress: "Rua",
        neighborhood: "Vila",
        city: cities[ 0 ],
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

    return {
        projectTitle: faker.lorem.words( 5 ),
        projectDescription: faker.lorem.paragraph(),
        pricingType: faker.helpers.arrayElement( pricingTypes ),
        projectBudget: {
            min: faker.finance.amount( { min: 500, max: 10000 } ),
            max: faker.finance.amount( { min: 500, max: 10000 } ),
            currency: "R$"
        },
        projectHourlyRate: {
            min: faker.finance.amount( { min: 500, max: 10000 } ),
            max: faker.finance.amount( { min: 500, max: 10000 } ),
            currency: "R$"
        },
        estimatedDuration: faker.number.int(),
        projectSize: faker.helpers.arrayElement( projectSizes ),
        experienceLevel: faker.helpers.arrayElement( experienceLevels ),
        workModel: faker.helpers.arrayElement( workModels ),
        location: generateLocationData(),
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