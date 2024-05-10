import ProjectCategory from "../models/projectCategoryModel.js";

const projectCategories = [
    {
        categoryName: "Web Development",
        categoryDescription: "Building and maintaining websites and web applications.",
    },
    {
        categoryName: "Mobile App Development",
        categoryDescription: "Creating applications for mobile devices.",
    },
    {
        categoryName: "Data Science",
        categoryDescription: "Analyzing and interpreting complex data.",
    },
    {
        categoryName: "Design",
        categoryDescription: "Creating visual concepts for products and brands.",
    },
];

const seedProjectCategories = async () => {
    try {
        await ProjectCategory.deleteMany( {} );
        await ProjectCategory.insertMany( projectCategories );
        console.log( "Project Category data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding Project Category data:", error );
    }
};

export default seedProjectCategories;