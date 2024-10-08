import FreelancerProfile from "../models/freelancerProfileModel.js";
import Specialization from "../models/specializationModel.js";
import Skill from "../models/skillModel.js";
import User from "../models/userModel.js";

const freelancerProfiles = [
    {
        firstName: "Miguel",
        lastName: "Santos",
        specializationId: [],
        profileSummary: "A highly motivated and experienced full-stack developer with 5+ years of expertise in building robust and scalable web applications using React and Node.js. Possesses a strong understanding of front-end and back-end development principles, and a proven track record of delivering high-quality projects on time and within budget. Passionate about staying up-to-date with the latest technologies and best practices in the industry.",
        experienceLevel: "MID-LEVEL",
        hourlyRate: {
            min: 50,
            max: 80,
            currency: "USD"
        },
        isAvailable: true,
        location: {
            streetAddress: "Rua XV de Novembro, 123",
            city: "SOROCABA",
            cep: "18035-000",
            neighborhood: "Centro",
        },
        skillIds: [],
        portfolioItems: [
            {
                title: "E-commerce Website",
                description: "Developed a fully functional e-commerce website using React and Node.js",
                url: "https://example-ecommerce.com"
            }
        ],
        educations: [
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
        workExperiences: [
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
        specializationId: [],
        profileSummary: "A highly skilled and experienced front-end developer with a passion for creating beautiful, responsive, and user-friendly interfaces. Possesses extensive knowledge of HTML, CSS, JavaScript, and various front-end frameworks such as React and Angular. Proven ability to translate design concepts into functional and engaging web experiences. Strong advocate for user-centered design principles and accessibility standards. Dedicated to delivering high-quality work and exceeding client expectations.",
        experienceLevel: "SENIOR",
        hourlyRate: {
            min: 80,
            max: 120,
            currency: "R$"
        },
        isAvailable: true,
        location: {
            streetAddress: "Rua XV de Novembro, 123",
            city: "SOROCABA",
            cep: "18035-000",
            neighborhood: "Centro",
        },
        skillIds: [],
        portfolioItems: [
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
        educations: [
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
        workExperiences: [
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
        
        freelancerProfiles[ 0 ].specializationId = [ specializationDocs[ 0 ]._id ];
        freelancerProfiles[ 0 ].skillIds = [ skillDocs[ 0 ]._id, skillDocs[ 1 ]._id ];
        freelancerProfiles[ 0 ].userId = freelancerDocs[ 0 ]._id;
        
        freelancerProfiles[ 1 ].specializationId = [ specializationDocs[ 1 ]._id ];
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