import Skill from "../models/skillModel.js";
import { faker } from '@faker-js/faker';

const generateSkillData = () => ( {
    skillName: faker.lorem.word(),
    skillDescription: faker.lorem.sentence()
} );

const seedSkills = async ( count = 10 ) => {
    try {
        const skills = [];
        for ( let i = 0; i < count; i++ ) {
            const newSkill = generateSkillData();

            // Check for uniqueness to avoid duplicate names
            const existingSkill = await Skill.findOne( {
                skillName: newSkill.skillName
            } );

            if ( !existingSkill ) {
                skills.push( newSkill );
            } else {
                // If a duplicate name is found, decrement i to retry generating a unique name
                i--;
            }
        }

        await Skill.deleteMany( {} );
        await Skill.insertMany( skills );
        console.log( `Seeded ${count} skill documents successfully!` );
    } catch ( error ) {
        console.error( "Error seeding Skill data:", error );
    }
};

export default seedSkills;