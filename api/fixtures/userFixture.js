import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const users = [
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
    
];

const seedUsers = async () => {
    try {
        await User.deleteMany( {} );
        await User.insertMany( users );
        console.log( "User data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding User data:", error );
    }
};

export default seedUsers;