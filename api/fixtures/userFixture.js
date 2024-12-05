import User from "../models/userModel.js";
import { createClientUsers } from "../utils/clientUserData.js";
import { createFreelancerUsers } from "../utils/freelancerUserData.js";

const seedUsers = async () => {
    try {
        await User.deleteMany({});
        const clientUsers = await createClientUsers();
        await User.insertMany(clientUsers);
        console.log("Client User data seeded successfully!");

        const freelancerUsers = await createFreelancerUsers();
        await User.insertMany(freelancerUsers);
        console.log("freelancer User data seeded successfully!");

    } catch (error) {
        console.error("Error seeding User data:", error);
    }
};

export default seedUsers;