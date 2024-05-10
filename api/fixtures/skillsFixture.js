import Skill from "../models/skillModel.js";

const skills = [
    {
        skillName: "JavaScript",
        skillDescription: "Front-end and back-end development, scripting, and interactivity.",
    },
    {
        skillName: "React",
        skillDescription: "Building user interfaces with reusable components.",
    },
    {
        skillName: "Node.js",
        skillDescription: "Server-side development using JavaScript.",
    },
    {
        skillName: "Python",
        skillDescription: "General-purpose programming, data science, and machine learning.",
    },
    {
        skillName: "Java",
        skillDescription: "Object-oriented programming for enterprise applications and Android development.",
    },
    {
        skillName: "SQL",
        skillDescription: "Database management and querying.",
    },
    {
        skillName: "PHP",
        skillDescription: "Server-side scripting and web development.",
    },
    {
        skillName: "C#",
        skillDescription: "Object-oriented programming for Windows applications and game development.",
    },
    {
        skillName: "Swift",
        skillDescription: "Developing iOS and macOS applications.",
    },
    {
        skillName: "Go",
        skillDescription: "Concurrent programming and system development.",
    },
    {
        skillName: "Machine Learning",
        skillDescription: "Building algorithms for predictive modeling and data analysis.",
    },
    {
        skillName: "Deep Learning",
        skillDescription: "Advanced machine learning techniques using neural networks.",
    },
    {
        skillName: "UX Design",
        skillDescription: "Designing user-centered experiences and interfaces.",
    },
    {
        skillName: "UI Design",
        skillDescription: "Creating visually appealing and intuitive user interfaces.",
    },
    {
        skillName: "Graphic Design",
        skillDescription: "Visual communication through images, typography, and layout.",
    },
    {
        skillName: "Content Writing",
        skillDescription: "Creating engaging and informative written content.",
    },
    {
        skillName: "Translation",
        skillDescription: "Converting text from one language to another.",
    },
];

const seedSkills = async () => {
    try {
        await Skill.deleteMany( {} );
        await Skill.insertMany( skills );
        console.log( "Skill data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding Skill data:", error );
    }
};

export default seedSkills;