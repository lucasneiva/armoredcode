import bcrypt from "bcryptjs";

export const createFreelancerUsers = async () => {
    const users = [
        //FREELANCERS
        //F00
        {
            username: `Miguel Santos`,
            email: `miguelsantos@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F01
        {
            username: `Joana Silva`,
            email: `joanasilva@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F02
        {
            username: `Lucas Pereira`,
            email: `lucaspereira@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F03
        {
            username: `Pedro Souza`,
            email: `pedrosouza@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F04
        {
            username: `Ana Oliveira`,
            email: `anaoliveira@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F05
        {
            username: `Juliana Costa`,
            email: `julianacosta@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F06
        {
            username: `Ricardo Almeida`,
            email: `ricardoalmeida@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F07
        {
            username: `Fernanda Rodrigues`,
            email: `fernandarodrigues@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F08
        {
            username: `Marcelo Santos`,
            email: `marcelosantos@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F09
        {
            username: `Patricia Gomes`,
            email: `patriciagomes@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F10
        {
            username: `Carlos Ferreira`,
            email: `carlosferreira@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F11
        {
            username: `Laura Lima`,
            email: `lauralima@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F12
        {
            username: `Rafael Cardoso`,
            email: `rafaelcardoso@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F13
        {
            username: `Isabela Cavalcanti`,
            email: `isabelacavalcanti@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F14
        {
            username: `Gustavo Barbato`,
            email: `gustavobarbato@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F15
        {
            username: `Mariana Barbosa`,
            email: `marianabarbosa@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F16
        {
            username: `Leornado Azevedo`,
            email: `leornadoazevedo@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F17
        {
            username: `Camila Ramos`,
            email: `camilaramos@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F18
        {
            username: `Bruno Silva`,
            email: `brunosilva@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F19
        {
            username: `Juliana Castro`,
            email: `julianacastro@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F20
        {
            username: `Victor Pereira`,
            email: `victorpereira@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F21
        {
            username: `Amanda Souza`,
            email: `amandasouza@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F22
        {
            username: `Gabriela Melo`,
            email: `gabrielamelo@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F23
        {
            username: `Bruno Ferreira`,
            email: `brunoferreira@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F24
        {
            username: `Juliana Lima`,
            email: `julianalima@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F25
        {
            username: `Victor Carvalho`,
            email: `victorcarvalho@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F26
        {
            username: `Amanda Costa`,
            email: `amandacosta@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F27
        {
            username: `Lucas Santos`,
            email: `lucassantos@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F28
        {
            username: `Gabriela Oliveira`,
            email: `gabrielaoliveira@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
        //F29
        {
            username: `Thiago Almeida`,
            email: `thiagoalmeida@example.com`,
            password: await bcrypt.hash("password123", 10),
            role: "FREELANCER",
            profileId: null,
        },
    ];
    return users;
};