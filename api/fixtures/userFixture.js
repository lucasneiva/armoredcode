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
    {
        username: "freelancer1",
        email: "freelancer1@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "FREELANCER",
        profileId: null,
    },
    {
        username: "freelancer2",
        email: "freelancer2@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "FREELANCER",
        profileId: null,
    },
    {
        username: "freelancer3",
        email: "freelancer3@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "FREELANCER",
        profileId: null,
    },
    {
        username: "freelancer4",
        email: "freelancer4@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "FREELANCER",
        profileId: null,
    },
    {
        username: "freelancer5",
        email: "freelancer5@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "FREELANCER",
        profileId: null,
    },
    {
        username: "freelancer6",
        email: "freelancer6@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "FREELANCER",
        profileId: null,
    },
    {
        username: "freelancer7",
        email: "freelancer7@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "FREELANCER",
        profileId: null,
    },
];

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