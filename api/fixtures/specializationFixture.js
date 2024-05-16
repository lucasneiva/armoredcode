import Specialization from "../models/specializationModel.js";

const specializations = [
    {
        specializationName: "Front-End Development",
        specializationDescription: "Building user interfaces with HTML, CSS, and JavaScript.",
    },
    {
        specializationName: "Back-End Development",
        specializationDescription: "Server-side logic, databases, and API development.",
    },
    {
        specializationName: "Machine Learning",
        specializationDescription: "Developing algorithms for predictive modeling.",
    },
    {
        specializationName: "UX/UI Design",
        specializationDescription: "Designing user-centered experiences.",
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