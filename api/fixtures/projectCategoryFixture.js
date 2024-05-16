import ProjectCategory from "../models/projectCategoryModel.js";
import { faker } from '@faker-js/faker';

const generateProjectCategoryData = () => ( {
    categoryName: faker.lorem.words( 3 ), // Use 3 words for category names
    categoryDescription: faker.lorem.sentence()
} );

const seedProjectCategories = async ( count = 10 ) => {
    try {
        const categories = [];
        for ( let i = 0; i < count; i++ ) {
            const newCategory = generateProjectCategoryData();
            const existingCategory = await ProjectCategory.findOne( {
                categoryName: newCategory.categoryName
            } );

            if ( !existingCategory ) {
                categories.push( newCategory );
            } else {
                i--; // Retry if duplicate name found
            }
        }

        await ProjectCategory.deleteMany( {} );
        await ProjectCategory.insertMany( categories );
        console.log( `Seeded ${categories.length} project category documents successfully!` );
    } catch ( error ) {
        console.error( "Error seeding ProjectCategory data:", error );
    }
};

export default seedProjectCategories;