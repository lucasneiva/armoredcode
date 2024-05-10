import Specialization from "../models/specializationModel.js";

const specializations = [
    {
        name: "Front-End Development",
        description: "Building user interfaces with HTML, CSS, and JavaScript.",
    },
    {
        name: "Back-End Development",
        description: "Server-side logic, databases, and API development.",
    },
    {
        name: "Machine Learning",
        description: "Developing algorithms for predictive modeling.",
    },
    {
        name: "UX/UI Design",
        description: "Designing user-centered experiences.",
    },
];

const seedSpecializations = async () => {
    try {
        await Specialization.deleteMany( {} );
        await Specialization.insertMany( specializations );
        console.log( "Specialization data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding Specialization data:", error );
    }
};

export default seedSpecializations; 