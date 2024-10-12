import FreelancerProfile from "../models/freelancerProfileModel.js";
import Specialization from "../models/specializationModel.js";
import Skill from "../models/skillModel.js";
import User from "../models/userModel.js";

const freelancerProfiles = [
    {
        firstName: "Miguel",
        lastName: "Santos",
        specializationId: [],
        profileSummary: "Sou um desenvolvedor full-stack altamente motivado e experiente, com mais de 5 anos de experiência na construção de aplicações web robustas e escaláveis ​​usando React e Node.js. Possui um forte entendimento dos princípios de desenvolvimento front-end e back-end e um histórico comprovado de entrega de projetos de alta qualidade dentro do prazo e do orçamento. Apaixonado por se manter atualizado com as mais recentes tecnologias e melhores práticas do setor.",
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
                description: "Desenvolvi um site de comércio eletrônico totalmente funcional usando React e Node.js",
                url: "https://example-ecommerce.com"
            }
        ],
        educations: [
            {
                degreeName: "Bacharel em Ciência da Computação",
                fieldOfStudy: "Ciência da Computação",
                institution: "Universidade da Califórnia, Berkeley",
                startDate: new Date("2016-09-01"),
                endDate: new Date("2020-06-01")
            }
        ],
        certifications: [
            {
                name: "Designer UX Certificado",
                issuingOrganization: "Instituto de Design UX",
                issueDate: new Date("2018-03-01")
            }
        ],
        workExperiences: [
            {
                companyName: "Tech Solutions Inc.",
                jobTitle: "Engenheiro de Software",
                startDate: new Date("2020-07-01"),
                endDate: null,
                jobDescription: "Desenvolvimento e manutenção de aplicações web utilizando React, Node.js e PostgreSQL."
            }
        ]
    },

    {
        firstName: "Joana",
        lastName: "Silva",
        specializationId: [],
        profileSummary: "Um desenvolvedor front-end altamente qualificado e experiente, apaixonado por criar interfaces bonitas, responsivas e fáceis de usar. Possui amplo conhecimento de HTML, CSS, JavaScript e vários frameworks front-end, como React e Angular. Capacidade comprovada de traduzir conceitos de design em experiências web funcionais e envolventes. Forte defensor de princípios de design centrados no usuário e padrões de acessibilidade. Dedicado a entregar um trabalho de alta qualidade e superar as expectativas do cliente.",
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
                description: "Redesenhei um site para ser responsivo e compatível com dispositivos móveis usando HTML, CSS e JavaScript",
                url: "https://example-redesign.com"
            },
            {
                title: "E-learning Platform",
                description: "Desenvolvi uma plataforma de e-learning usando React, Redux e Webpack",
                url: "https://example-elearning.com"
            }
        ],
        educations: [
            {
                degreeName: "Mestrado em Interação Humano-Computador",
                fieldOfStudy: "Interação Humano-Computador",
                institution: "Universidade Carnegie Mellon",
                startDate: new Date("2012-09-01"),
                endDate: new Date("2014-06-01")
            }
        ],
        certifications: [
            {
                name: "Designer UX Certificado",
                issuingOrganization: "Instituto de Design UX",
                issueDate: new Date("2018-03-01")
            }
        ],
        workExperiences: [
            {
                companyName: "DesignLab",
                jobTitle: "Desenvolvedor Sênior em Front-End",
                startDate: new Date("2018-01-01"),
                endDate: null,
                jobDescription: "Liderei uma equipe de desenvolvedores front-end para criar interfaces responsivas e fáceis de usar para diversos clientes."
            },
            {
                companyName: "TechCorp",
                jobTitle: "Desenvolvedor Front-End",
                startDate: new Date("2015-06-01"),
                endDate: new Date("2017-12-01"),
                jobDescription: "Desenvolvi e mantive vários aplicativos web usando HTML, CSS e JavaScript."
            }
        ]
    }
];

const seedFreelancerProfiles = async () => {
    try {

        const specializationDocs = await Specialization.find({}).lean();
        const skillDocs = await Skill.find({}).lean();
        const freelancerDocs = await User.find({ role: "FREELANCER" }).lean();

        freelancerProfiles[0].specializationId = [specializationDocs[0]._id];
        freelancerProfiles[0].skillIds = [skillDocs[0]._id, skillDocs[1]._id];
        freelancerProfiles[0].userId = freelancerDocs[0]._id;

        freelancerProfiles[1].specializationId = [specializationDocs[1]._id];
        freelancerProfiles[1].skillIds = [skillDocs[2]._id, skillDocs[3]._id];
        freelancerProfiles[1].userId = freelancerDocs[1]._id;

        await FreelancerProfile.deleteMany({});

        await FreelancerProfile.insertMany(freelancerProfiles);

        console.log("Freelancer profile data seeded successfully!");
    } catch (error) {
        console.error("Error seeding Freelancer profile data:", error);
    }
};

export default seedFreelancerProfiles;