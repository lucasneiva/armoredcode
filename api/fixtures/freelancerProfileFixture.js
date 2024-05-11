import FreelancerProfile from "../models/freelancerProfileModel.js";
import Specialization from "../models/specializationModel.js";
import Skill from "../models/skillModel.js";
import User from "../models/userModel.js";

const freelancerProfiles = [
    {
        firstName: "Miguel",
        lastName: "Santos",
        specializations: [],
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
            CEP: "12345678"
        },
        skillIds: [],
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
        certifications: [
            {
                name: "Certified UX Designer",
                issuingOrganization: "UX Design Institute",
                issueDate: new Date( "2018-03-01" )
            }
        ],
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

    {
        firstName: "Joana",
        lastName: "Silva",
        specializations: [],
        profileSummary: "Highly skilled front-end developer with expertise in creating responsive and user-friendly interfaces.",
        experienceLevel: "SENIOR",
        hourlyRate: {
            min: 80,
            max: 120,
            currency: "R$"
        },
        isAvailable: true,
        location: {
            city: "SOROCABA",
            CEP: "10021"
        },
        skillIds: [],
        portfolio: [
            {
                title: "Responsive Website Redesign",
                description: "Redesigned a website to be responsive and mobile-friendly using HTML, CSS, and JavaScript",
                url: "https://example-redesign.com"
            },
            {
                title: "E-learning Platform",
                description: "Developed an e-learning platform using React, Redux, and Webpack",
                url: "https://example-elearning.com"
            }
        ],
        education: [
            {
                degreeName: "Master of Science in Human-Computer Interaction",
                fieldOfStudy: "Human-Computer Interaction",
                institution: "Carnegie Mellon University",
                startDate: new Date( "2012-09-01" ),
                endDate: new Date( "2014-06-01" )
            }
        ],
        certifications: [
            {
                name: "Certified UX Designer",
                issuingOrganization: "UX Design Institute",
                issueDate: new Date( "2018-03-01" )
            }
        ],
        workExperience: [
            {
                companyName: "DesignLab",
                jobTitle: "Senior Front-end Developer",
                startDate: new Date( "2018-01-01" ),
                endDate: null,
                jobDescription: "Led a team of front-end developers to create responsive and user-friendly interfaces for various clients."
            },
            {
                companyName: "TechCorp",
                jobTitle: "Front-end Developer",
                startDate: new Date( "2015-06-01" ),
                endDate: new Date( "2017-12-01" ),
                jobDescription: "Developed and maintained multiple web applications using HTML, CSS, and JavaScript."
            }
        ]
    }
];

const seedFreelancerProfiles = async () => {
    try {

        const specializationDocs = await Specialization.find( {} ).lean();
        const skillDocs = await Skill.find( {} ).lean();
        const freelancerDocs = await User.find( { role: "FREELANCER" } ).lean();
        
        freelancerProfiles[ 0 ].specializations = [ specializationDocs[ 0 ]._id ];
        freelancerProfiles[ 0 ].skillIds = [ skillDocs[ 0 ]._id, skillDocs[ 1 ]._id ];
        freelancerProfiles[ 0 ].userId = freelancerDocs[ 0 ]._id;
        
        freelancerProfiles[ 1 ].specializations = [ specializationDocs[ 1 ]._id ];
        freelancerProfiles[ 1 ].skillIds = [ skillDocs[ 2 ]._id, skillDocs[ 3 ]._id ];
        freelancerProfiles[ 1 ].userId = freelancerDocs[ 1 ]._id;

        await FreelancerProfile.deleteMany( {} );

        await FreelancerProfile.insertMany( freelancerProfiles );

        console.log( "Freelancer profile data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding Freelancer profile data:", error );
    }
};

export default seedFreelancerProfiles;