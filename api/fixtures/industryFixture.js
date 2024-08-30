import Industry from "../models/industryModel.js";

const industryData = [
    { name: "Tecnologia da Informação", description: "Engloba empresas que desenvolvem softwares, fornecem serviços de TI e comercializam hardware." },
    { name: "Saúde", description: "Hospitais, clínicas, laboratórios, empresas farmacêuticas e de biotecnologia." },
    { name: "Educação", description: "Instituições de ensino, escolas, universidades, plataformas de educação online e empresas de treinamento." },
    { name: "Finanças", description: "Bancos, corretoras, empresas de investimento, fintechs e seguradoras." },
    { name: "Varejo", description: "Lojas físicas e online, supermercados, comércio eletrônico e empresas de logística." },
    { name: "Manufatura", description: "Indústrias que produzem bens, desde alimentos e bebidas até automóveis e eletrônicos." },
    { name: "Turismo e Hospitalidade", description: "Hotéis, restaurantes, agências de viagens, companhias aéreas e empresas de entretenimento." },
    { name: "Energia", description: "Empresas que geram, distribuem e comercializam energia, incluindo petróleo, gás, energia renovável e nuclear." },
    { name: "Construção Civil", description: "Construtoras, empreiteiras, empresas de engenharia e arquitetura, fabricantes de materiais de construção." },
    { name: "Telecomunicações", description: "Operadoras de telefonia, provedores de internet, empresas de comunicação via satélite e fibra óptica." },
    { name: "Agronegócio", description: "Produção agrícola, pecuária, empresas de insumos agrícolas, processamento de alimentos e distribuição." },
    { name: "Serviços Profissionais", description: "Consultoria, advocacia, contabilidade, auditoria, marketing, publicidade e recursos humanos." },
    { name: "Governo", description: "Órgãos públicos, instituições governamentais e empresas estatais." },
    { name: "Organizações sem Fins Lucrativos", description: "ONGs, instituições de caridade, fundações e associações que atuam em diversas áreas." },
    { name: "Mídia e Entretenimento", description: "Empresas de televisão, rádio, cinema, música, jogos eletrônicos e plataformas de streaming." },
    { name: "Transporte e Logística", description: "Empresas de transporte rodoviário, ferroviário, aéreo e marítimo, empresas de logística e entrega." },
    { name: "Automobilística", description: "Fabricantes de automóveis, peças e componentes, concessionárias e empresas de serviços automotivos." },
    { name: "Moda e Vestuário", description: "Marcas de roupas, calçados e acessórios, varejistas de moda e empresas de design." },
    { name: "Alimentos e Bebidas", description: "Produtores de alimentos e bebidas, restaurantes, supermercados e empresas de distribuição." },
    { name: "Farmacêutica e Biotecnologia", description: "Empresas farmacêuticas, empresas de biotecnologia, laboratórios de pesquisa e desenvolvimento." },
];

const seedIndustries = async () => {
    try {
        const industries = [];
        await Industry.deleteMany( {} );

        for ( const data of industryData ) {
            const existingIndustry = await Industry.findOne( { name: data.name } );
            if ( !existingIndustry ) {
                industries.push( {
                    name: data.name,
                    description: data.description,
                } );
            } else {
                console.warn( `Industry '${data.name}' already exists. Skipping.` );
            }
        }

        await Industry.insertMany( industries );
        console.log( `Seeded ${industries.length} industry documents successfully!` );
    } catch ( error ) {
        console.error( "Error seeding Industry data:", error );
    }
};

export default seedIndustries;