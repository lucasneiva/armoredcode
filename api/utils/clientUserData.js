import bcrypt from "bcryptjs";

export const createClientUsers = async () => {
    const users = [
        //CLIENTS
        //C00
        {
            username: "TechSol",
            email: "techsol@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C01
        {
            username: "MetalSocabana",
            email: "metalsocabana@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C02
        {
            username: "CloudTech",
            email: "cloudtech@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C03
        {
            username: "Digital Innovation",
            email: "dih@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C04
        {
            username: "Cybersecurity Experts",
            email: "cyberexperts@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C05
        {
            username: "Data Analytics",
            email: "das@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C06
        {
            username: "Mobile App Devs",
            email: "madevs@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C07
        {
            username: "Soft. E. Solutions",
            email: "Soenso@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C08
        {
            username: "IT Consulting",
            email: "itconsulting@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C09
        {
            username: "Web Design Studio",
            email: "Webds@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C10
        {
            username: "Pão Quente",
            email: "padariapq@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C11
        {
            username: "Prédio Alto",
            email: "construtorapa@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C12
        {
            username: "Médica Saúde",
            email: "clinicams@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C13
        {
            username: "Idiomas Linguas",
            email: "escolaidli@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
        //C14
        {
            username: "Corpo em Forma",
            email: "academiaCorFor@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "CLIENT",
            profileId: null,
        },
    ];
    return users;
};