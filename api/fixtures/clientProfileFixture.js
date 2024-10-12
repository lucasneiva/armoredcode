import clientProfile from "../models/clientProfileModel.js";
import Industry from "../models/industryModel.js";
import User from "../models/userModel.js";

const clientProfiles = [
    {
        companyName: "TechSol Ltda.",
        companyDescription: "TechSol Ltda. é uma empresa de software dinâmica e inovadora, especializada em fornecer soluções de ponta para pequenas empresas. Nossa equipe de desenvolvedores e designers experientes é apaixonada por criar software eficiente e fácil de usar que ajuda as empresas a otimizar suas operações, melhorar a produtividade e atingir seus objetivos. Oferecemos uma ampla gama de serviços, incluindo desenvolvimento de software personalizado, desenvolvimento de aplicativos web, desenvolvimento de aplicativos móveis e soluções baseadas em nuvem. Nosso compromisso com a qualidade, preço acessível e satisfação do cliente nos tornou um parceiro confiável para empresas de todos os tamanhos.",
        companySize: "SMALL",
        profileImage: null,
        industryId: "645b6c612345678901234567",
        website: "https://www.techsol.com.br",
        location: {
            streetAddress: "Rua XV de Novembro, 123",
            city: "SOROCABA",
            cep: "18035-000",
            neighborhood: "Centro",
        }
    },

    {
        companyName: "Metalúrgica Sorocabana S.A.",
        companyDescription: "A Metalúrgica Sorocabana S.A. é uma renomada e consolidada fabricante de peças e componentes metálicos de alta precisão. Com décadas de experiência no setor, construímos uma reputação de oferecer qualidade, confiabilidade e inovação excepcionais. Nossas instalações de última geração e mão de obra qualificada nos permitem produzir uma ampla variedade de peças metálicas para diversos setores, incluindo automotivo, aeroespacial, construção e maquinário. Estamos empenhados em satisfazer os rigorosos requisitos dos nossos clientes e superar as suas expectativas através da melhoria contínua e de um forte foco na satisfação do cliente.",
        companySize: "MEDIUM",
        profileImage: null,
        industryId: "645b6c612345678901234568",
        website: "https://www.metalsocabana.com.br",
        location: {
            streetAddress: "Avenida Independência, 456",
            city: "SOROCABA",
            cep: "18087-123",
            neighborhood: "Centro",
        }
    }

];

const seedClientProfiles = async () => {
    try {
        const industryDocs = await Industry.find( {} ).lean();
        const clientDocs = await User.find( { role: "CLIENT" } ).lean();

        clientProfiles[ 0 ].industryId = industryDocs[ 0 ];
        clientProfiles[ 0 ].userId = clientDocs[ 0 ]._id;

        clientProfiles[ 1 ].industryId = industryDocs[ 1 ];
        clientProfiles[ 1 ].userId = clientDocs[ 1 ]._id;

        await clientProfile.deleteMany( {} );

        await clientProfile.insertMany( clientProfiles );

        console.log( "Client profile data seeded successfully!" );
    } catch ( error ) {
        console.error( "Error seeding client profile data:", error );
    }
};

export default seedClientProfiles;