import Industry from "../models/industryModel.js";
import { faker } from '@faker-js/faker';

const generateIndustryData = () => ( {
    name: faker.lorem.word(),
    description: faker.lorem.sentence()
} );

const seedIndustries = async ( count = 10 ) => {
    try {
        const industries = [];
        await Industry.deleteMany( {} );

        for ( let i = 0; i < count; i++ ) {
            const newIndustry = generateIndustryData();
            const existingIndustry = await Industry.findOne( { name: newIndustry.name } );
            if ( !existingIndustry ) {
                industries.push( newIndustry );
            } else {
                i--; // Retry if duplicate name found
            }
        }

        await Industry.insertMany( industries );
        console.log( `Seeded ${industries.length} industry documents successfully!` );
    } catch ( error ) {
        console.error( "Error seeding Industry data:", error );
    }
};

export default seedIndustries;