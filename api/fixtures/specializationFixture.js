import Specialization from "../models/specializationModel.js";
import { faker } from '@faker-js/faker';

const generateSpecializationData = () => ( {
    specializationName: faker.lorem.words( 2 ), // Generate 2-word specialization names
    specializationDescription: faker.lorem.sentence()
} );

const seedSpecializations = async ( count = 10 ) => {

    await Specialization.deleteMany( {} );
    
    try {
        const specializations = [];
        for ( let i = 0; i < count; i++ ) {
            const newSpecialization = generateSpecializationData();

            // Check for uniqueness to avoid duplicate names
            const existingSpecialization = await Specialization.findOne( {
                specializationName: newSpecialization.specializationName
            } );

            if ( !existingSpecialization ) {
                specializations.push( newSpecialization );
            } else {
                // If a duplicate name is found, decrement i to retry generating a unique name
                i--;
            }
        }
        await Specialization.insertMany( specializations );
        console.log( `Seeded ${specializations.length} specialization documents successfully!` );
    } catch ( error ) {
        console.error( "Error seeding Specialization data:", error );
    }
};

export default seedSpecializations;