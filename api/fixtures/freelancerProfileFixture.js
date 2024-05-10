// freelancerProfileFixture.js
import FreelancerProfile from "../models/freelancerProfileModel.js";
import Specialization from "../models/specializationModel.js";
import Skill from "../models/skillModel.js";
import User from "../models/userModel.js";

const freelancerProfiles = [
    {
        firstName: "John",
        lastName: "Doe",
        specializations: [], // Leave empty initially
        profileSummary: "Experienced full-stack developer with expertise in React and Node.js.",
        experienceLevel: "MID-LEVEL",
        hourlyRate: {
            min: 50,
            max: 80,
            currency: "USD"
        },
        isAvailable: true,
        location: {
            city: "SOROCABA",
            zipCode: "12345678"
        },
        skillIds: [], // Leave empty initially
        portfolio: [
            {
                title: "E-commerce Website",
                description: "Developed a fully functional e-commerce website using React and Node.js",
                url: "https://example-ecommerce.com"
            }
        ],
        education: [
            {
                degreeName: "Bachelor of Science in Computer Science",
                fieldOfStudy: "Computer Science",
                institution: "University of California, Berkeley",
                startDate: new Date( "2016-09-01" ),
                endDate: new Date( "2020-06-01" )
            }
        ],
        certifications: [],
        workExperience: [
            {
                companyName: "Tech Solutions Inc.",
                jobTitle: "Software Engineer",
                startDate: new Date( "2020-07-01" ),
                endDate: null,
                jobDescription: "Developed and maintained web applications using React, Node.js and PostgreSQL."
            }
        ]
    },
    // ... Add more freelancer profiles with varied data 
];

const seedFreelancerProfiles = async () => {
    try {
        // Fetch required IDs
        const specializationDocs = await Specialization.find( {} ).lean();
        const skillDocs = await Skill.find( {} ).lean();

        // Populate freelancerProfiles with IDs 
        freelancerProfiles[ 0 ].specializations = [ specializationDocs[ 0 ]._id ]; // Assign the first specialization
        freelancerProfiles[ 0 ].skillIds = [ skillDocs[ 0 ]._id, skillDocs[ 1 ]._id ]; // Assign the first two skills 

        // ... (Populate other freelancer profiles with IDs, ensuring variety)

        await FreelancerProfile.deleteMany( {} );
        const createdProfiles = await FreelancerProfile.insertMany( freelancerProfiles );

        // Update user fixtures with profile IDs
        for ( let i = 0; i < createdProfiles.length; i++ ) {
            await User.findOneAndUpdate(
                { username: `freelancer${i + 1}` },
                { profile: createdProfiles[ i ]._id }
            );
        }

        console.log( "Freelancer profile data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding Freelancer profile data:", error );
    }
};

export default seedFreelancerProfiles;