import bcrypt from "bcryptjs";

export const users = [
    //CLIENTS
    //C00
    {
        username: "TechSol",
        email: "techsol@example.com",
        password: await bcrypt.hash( "password123", 0 ),
        role: "CLIENT",
        profileId: null,
    },
    //C01
    {
        username: "MetalSocabana",
        email: "metalsocabana@example.com",
        password: await bcrypt.hash( "password123", 1 ),
        role: "CLIENT",
        profileId: null,
    },
    //C02
    {
        username: "CloudTech",
        email: "cloudtech@example.com",
        password: await bcrypt.hash( "password123", 2 ),
        role: "CLIENT",
        profileId: null,
    },
    //C03
    {
        username: "Digital Innovation",
        email: "dih@example.com",
        password: await bcrypt.hash( "password123", 3 ),
        role: "CLIENT",
        profileId: null,
    },
    //C04
    {
        username: "Cybersecurity Experts",
        email: "cyberexperts@example.com",
        password: await bcrypt.hash( "password123", 4 ),
        role: "CLIENT",
        profileId: null,
    },
    //C05
    {
        username: "Data Analytics",
        email: "das@example.com",
        password: await bcrypt.hash( "password123", 5 ),
        role: "CLIENT",
        profileId: null,
    },
    //C06
    {
        username: "Mobile App Devs",
        email: "madevs@example.com",
        password: await bcrypt.hash( "password123", 6 ),
        role: "CLIENT",
        profileId: null,
    },
    //C07
    {
        username: "Soft. E. Solutions",
        email: "Soenso@example.com",
        password: await bcrypt.hash( "password123", 7 ),
        role: "CLIENT",
        profileId: null,
    },
    //C08
    {
        username: "IT Consulting",
        email: "itconsulting@example.com",
        password: await bcrypt.hash( "password123", 8 ),
        role: "CLIENT",
        profileId: null,
    },
    //C09
    {
        username: "Web Design Studio",
        email: "Webds@example.com",
        password: await bcrypt.hash( "password123", 9 ),
        role: "CLIENT",
        profileId: null,
    },
    //C10
    {
        username: "Pão Quente",
        email: "padariapq@example.com",
        password: await bcrypt.hash( "password123", 10 ),
        role: "CLIENT",
        profileId: null,
    },
    //C11
    {
        username: "Prédio Alto",
        email: "construtorapa@example.com",
        password: await bcrypt.hash( "password123", 11 ),
        role: "CLIENT",
        profileId: null,
    },
    //C12
    {
        username: "Médica Saúde",
        email: "clinicams@example.com",
        password: await bcrypt.hash( "password123", 12 ),
        role: "CLIENT",
        profileId: null,
    },
    //C13
    {
        username: "Idiomas Linguas",
        email: "escolaidli@example.com",
        password: await bcrypt.hash( "password123", 13 ),
        role: "CLIENT",
        profileId: null,
    },
    //C14
    {
        username: "Corpo em Forma",
        email: "academiaCorFor@example.com",
        password: await bcrypt.hash( "password123", 14 ),
        role: "CLIENT",
        profileId: null,
    },
    //FREELANCERS
    //F00
    {
        username: `Miguel Santos`,
        email: `miguelsantos@example.com`,
        password: await bcrypt.hash("password123", 0),
        role: "FREELANCER",
        profileId: null,
    },
    //F01
    {
        username: `Joana Silva`,
        email: `joanasilva@example.com`,
        password: await bcrypt.hash("password123", 1),
        role: "FREELANCER",
        profileId: null,
    },
    //F02
    {
        username: `Lucas Pereira`,
        email: `lucaspereira@example.com`,
        password: await bcrypt.hash("password123", 2),
        role: "FREELANCER",
        profileId: null,
    },
    //F03
    {
        username: `Pedro Souza`,
        email: `pedrosouza@example.com`,
        password: await bcrypt.hash("password123", 3),
        role: "FREELANCER",
        profileId: null,
    },
    //F04
    {
        username: `Ana Oliveira`,
        email: `anaoliveira@example.com`,
        password: await bcrypt.hash("password123", 4),
        role: "FREELANCER",
        profileId: null,
    },
    //F05
    {
        username: `Juliana Costa`,
        email: `julianacosta@example.com`,
        password: await bcrypt.hash("password123", 5),
        role: "FREELANCER",
        profileId: null,
    },
    //F06
    {
        username: `Ricardo Almeida`,
        email: `Ricardo Almeida@example.com`,
        password: await bcrypt.hash("password123", 6),
        role: "FREELANCER",
        profileId: null,
    },
    //F07
    {
        username: `Fernanda Rodrigues`,
        email: `fernandarodrigues@example.com`,
        password: await bcrypt.hash("password123", 7),
        role: "FREELANCER",
        profileId: null,
    },
];