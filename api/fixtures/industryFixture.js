import Industry from "../models/industryModel.js";

const industries = [
    {
        name: "Information Technology",
        description: "Software, hardware, and technology services."
    },
    {
        name: "Finance",
        description: "Banking, investment, and financial services."
    },
    {
        name: "Healthcare",
        description: "Medical services, hospitals, and pharmaceuticals."
    },
    {
        name: "Education",
        description: "Schools, universities, and educational institutions."
    }
];

const seedIndustries = async () => {
    try {
        await Industry.deleteMany( {} );
        await Industry.insertMany( industries );
        console.log( "Industry data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding Industry data:", error );
    }
};

export default seedIndustries;