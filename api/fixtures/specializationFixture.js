import Specialization from "../models/specializationModel.js";

const specializationData = [
  { name: "Desenvolvimento Web Front-End", description: "Especialização na criação de interfaces de usuário web interativas e responsivas." },
  { name: "Desenvolvimento Web Back-End", description: "Foco no desenvolvimento da lógica do servidor, APIs e bancos de dados para aplicações web." },
  { name: "Desenvolvimento Web Full-Stack", description: "Domínio tanto do front-end quanto do back-end, permitindo a criação de aplicações web completas." },
  { name: "Desenvolvimento Mobile Android", description: "Criação de aplicativos nativos para dispositivos Android usando Java ou Kotlin." },
  { name: "Desenvolvimento Mobile iOS", description: "Desenvolvimento de aplicativos para dispositivos iOS usando Swift ou Objective-C." },
  { name: "Desenvolvimento Mobile Híbrido", description: "Criação de aplicativos multiplataforma usando tecnologias como React Native, Flutter ou Ionic." },
  { name: "Desenvolvimento de Jogos", description: "Especialização na criação de jogos para diversas plataformas, utilizando engines como Unity ou Unreal Engine." },
  { name: "Ciência de Dados", description: "Análise e interpretação de grandes conjuntos de dados para extrair insights e tomar decisões estratégicas." },
  { name: "Engenharia de Machine Learning", description: "Desenvolvimento de algoritmos e modelos de aprendizado de máquina para automatizar tarefas e resolver problemas complexos." },
  { name: "Inteligência Artificial", description: "Criação de sistemas inteligentes que podem simular a inteligência humana, como reconhecimento de fala e processamento de linguagem natural." },
  { name: "DevOps", description: "Automação e otimização do processo de desenvolvimento e entrega de software, integrando desenvolvimento e operações." },
  { name: "Engenharia de Software", description: "Aplicação de princípios de engenharia para projetar, desenvolver e manter sistemas de software complexos." },
  { name: "UX/UI Design", description: "Criação de interfaces de usuário intuitivas e atraentes, focando na experiência do usuário e na usabilidade." },
  { name: "Design Gráfico", description: "Criação de elementos visuais para comunicação, como logotipos, banners e materiais de marketing." },
  { name: "Gestão de Projetos", description: "Planejamento, organização e execução de projetos de desenvolvimento de software, garantindo o cumprimento de prazos e objetivos." },
  { name: "Segurança da Informação", description: "Proteção de sistemas e dados contra ameaças cibernéticas, implementando medidas de segurança e respondendo a incidentes." },
  { name: "Cloud Computing", description: "Utilização de serviços de computação em nuvem, como Amazon Web Services (AWS), Microsoft Azure ou Google Cloud Platform (GCP)." },
  { name: "Blockchain", description: "Desenvolvimento e implementação de soluções baseadas em blockchain, como criptomoedas e contratos inteligentes." },
  { name: "Realidade Virtual e Aumentada", description: "Criação de experiências imersivas e interativas utilizando tecnologias de realidade virtual (VR) e realidade aumentada (AR)." },
];

const seedSpecializations = async () => {
  try {
    const specializations = [];
    await Specialization.deleteMany({});

    for (const data of specializationData) {
      const existingSpecialization = await Specialization.findOne({ specializationName: data.name });
      if (!existingSpecialization) {
        specializations.push({
          specializationName: data.name,
          specializationDescription: data.description,
        });
      } else {
        console.warn(`Specialization '${data.name}' already exists. Skipping.`);
      }
    }

    await Specialization.insertMany(specializations);
    console.log(`Seeded ${specializations.length} Specialization documents successfully!`);
  } catch (error) {
    console.error("Error seeding Specialization data:", error);
  }
};
/*
const seedSpecializations = async () => {
    try {
      for (const data of specializationData) {
        await Specialization.findOneAndUpdate(
          { specializationName: data.name }, // Find by name
          { 
            specializationName: data.name, 
            specializationDescription: data.description 
          },
          { upsert: true, new: true } // Create if not found, return new document
        );
      }
      console.log(
        `Updated or inserted specializations successfully!`
      );
    } catch (error) {
      console.error("Error seeding/updating Specialization data:", error);
    }
*/

/*
const seedSpecializations = async () => {
    try {
        const specializations = [];
        for ( const data of specializationData ) {
            // Check for uniqueness to avoid duplicate names
            const existingSpecialization = await Specialization.findOne( {
                specializationName: data.name,
            } );

            if ( !existingSpecialization ) {
                specializations.push( {
                    specializationName: data.name,
                    specializationDescription: data.description,
                } );
            } else {
                console.warn( `Specialization '${data.name}' already exists. Skipping.` );
            }
        }
        await Specialization.insertMany( specializations );
        console.log(
            `Seeded ${specializations.length} specialization documents successfully!`
        );
    } catch ( error ) {
        console.error( "Error seeding Specialization data:", error );
    }

};
*/

export default seedSpecializations;