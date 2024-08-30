import ProjectCategory from "../models/projectCategoryModel.js";

const projectCategoryData = [
    { name: "Desenvolvimento Web", description: "Projetos relacionados à criação de websites e aplicações web." },
    { name: "Desenvolvimento Mobile", description: "Criação de aplicativos para dispositivos móveis, como smartphones e tablets." },
    { name: "Design e UX/UI", description: "Projetos focados em design de interfaces, experiência do usuário e usabilidade." },
    { name: "Ciência de Dados e Machine Learning", description: "Projetos que envolvem análise de dados, aprendizado de máquina e inteligência artificial." },
    { name: "DevOps e Engenharia de Software", description: "Projetos relacionados à automação, infraestrutura e desenvolvimento de software." },
    { name: "Marketing Digital e Mídias Sociais", description: "Criação de campanhas de marketing online, gestão de redes sociais e SEO." },
    { name: "Gestão de Projetos e Negócios", description: "Projetos de planejamento, organização e gestão de projetos e negócios." },
    { name: "E-commerce e Varejo Online", description: "Desenvolvimento de lojas virtuais, plataformas de e-commerce e soluções para o varejo online." },
    { name: "Educação e Treinamento", description: "Criação de plataformas de ensino online, cursos online e materiais educativos." },
    { name: "Saúde e Bem-Estar", description: "Projetos relacionados à saúde, bem-estar, fitness e tecnologia médica." },
    { name: "Finanças e Fintechs", description: "Desenvolvimento de soluções financeiras, aplicativos bancários e plataformas de investimento." },
    { name: "Realidade Virtual e Aumentada", description: "Criação de experiências imersivas e interativas em VR e AR." },
    { name: "Jogos e Entretenimento", description: "Desenvolvimento de jogos eletrônicos, aplicativos de entretenimento e plataformas de streaming." },
    { name: "IoT (Internet das Coisas)", description: "Projetos que conectam dispositivos à internet, como casas inteligentes e cidades inteligentes." },
    { name: "Blockchain e Criptomoedas", description: "Desenvolvimento de aplicações blockchain, contratos inteligentes e soluções para criptomoedas." },
    { name: "Sustentabilidade e Meio Ambiente", description: "Projetos que visam a sustentabilidade, a preservação do meio ambiente e a energia renovável." },
    { name: "Automação Industrial e Robótica", description: "Projetos que envolvem automação de processos industriais, robótica e inteligência artificial na indústria." },
    { name: "Segurança da Informação e Cibersegurança", description: "Projetos relacionados à proteção de dados, segurança de sistemas e defesa contra ataques cibernéticos." },
    { name: "Artes e Design Gráfico", description: "Projetos de design gráfico, ilustração, animação e produção artística." },
    { name: "Música e Produção Audiovisual", description: "Projetos de produção musical, edição de vídeo, animação e produção de conteúdo audiovisual." },
];

const seedProjectCategories = async () => {
    try {
        const categories = [];
        await ProjectCategory.deleteMany( {} );

        for ( const data of projectCategoryData ) {
            const existingCategory = await ProjectCategory.findOne( { name: data.name } );
            if ( !existingCategory ) {
                categories.push( {
                    categoryName: data.name,
                    categoryDescription: data.description,
                } );
            } else {
                console.warn( `Project Category '${data.name}' already exists. Skipping.` );
            }
        }

        await ProjectCategory.insertMany( categories );
        console.log( `Seeded ${categories.length} project category documents successfully!` );
    } catch ( error ) {
        console.error( "Error seeding ProjectCategory data:", error );
    }
};

export default seedProjectCategories;