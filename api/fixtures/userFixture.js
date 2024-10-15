import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const users = [
    {
        username: "client1",
        email: "client1@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "CLIENT",
        profileId: null,
    },
    {
        username: "client2",
        email: "client2@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "CLIENT",
        profileId: null,
    },
];

for (let i = 1; i <= 30; i++) {
    users.push({
        username: `freelancer${i}`,
        email: `freelancer${i}@example.com`,
        password: await bcrypt.hash("password123", 10),
        role: "FREELANCER",
        profileId: null,
    });
}

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