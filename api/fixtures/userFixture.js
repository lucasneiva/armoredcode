import User from "../models/userModel.js";
import { users } from "../utils/userData.js";

const seedUsers = async () => {
    try {
        await User.deleteMany( {} );
        await User.insertMany( users );
        console.log( "User data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding User data:", error );
    }
};

export default seedUsers;