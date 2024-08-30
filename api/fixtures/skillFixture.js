import Skill from "../models/skillModel.js";

const skillData = [
    { name: "JavaScript", description: "Linguagem de programação amplamente utilizada para desenvolvimento web front-end e back-end." },
    { name: "Python", description: "Linguagem de programação versátil usada em ciência de dados, machine learning, desenvolvimento web e scripting." },
    { name: "Java", description: "Linguagem de programação popular para desenvolvimento de aplicativos Android, back-end e sistemas corporativos." },
    { name: "C#", description: "Linguagem de programação da Microsoft usada para desenvolvimento de aplicativos .NET, jogos e aplicações web." },
    { name: "C++", description: "Linguagem de programação poderosa usada em desenvolvimento de jogos, sistemas embarcados e aplicações de alto desempenho." },
    { name: "PHP", description: "Linguagem de programação popular para desenvolvimento web back-end, especialmente em sites WordPress." },
    { name: "Swift", description: "Linguagem de programação da Apple para desenvolvimento iOS, macOS, watchOS e tvOS." },
    { name: "Kotlin", description: "Linguagem de programação moderna para desenvolvimento Android, interoperável com Java." },
    { name: "React", description: "Biblioteca JavaScript para construção de interfaces de usuário, popular para desenvolvimento web front-end." },
    { name: "Angular", description: "Framework JavaScript para desenvolvimento web front-end, mantido pelo Google." },
    { name: "Vue.js", description: "Framework JavaScript progressivo para desenvolvimento web front-end, fácil de aprender e usar." },
    { name: "Node.js", description: "Ambiente de execução JavaScript para desenvolvimento back-end e aplicações de rede." },
    { name: "Express.js", description: "Framework web minimalista para Node.js, facilitando a criação de APIs RESTful." },
    { name: "React Native", description: "Framework para desenvolvimento mobile multiplataforma usando JavaScript e React." },
    { name: "Flutter", description: "SDK do Google para desenvolvimento mobile multiplataforma usando a linguagem Dart." },
    { name: "SQL", description: "Linguagem de consulta padrão para bancos de dados relacionais, como MySQL, PostgreSQL e SQL Server." },
    { name: "NoSQL", description: "Categoria de bancos de dados não relacionais, como MongoDB e Cassandra, para lidar com grandes volumes de dados." },
    { name: "Git", description: "Sistema de controle de versão distribuído, essencial para desenvolvimento de software em equipe." },
    { name: "Docker", description: "Plataforma para conteinerização de aplicações, facilitando a implantação e gerenciamento de software." },
    { name: "AWS", description: "Plataforma de computação em nuvem da Amazon, oferecendo diversos serviços como armazenamento, computação e banco de dados." },
    { name: "Azure", description: "Plataforma de computação em nuvem da Microsoft, com serviços semelhantes aos da AWS." },
    { name: "Google Cloud", description: "Plataforma de computação em nuvem do Google, também com serviços de armazenamento, computação e banco de dados." },
    { name: "HTML", description: "Linguagem de marcação para estruturação de conteúdo web." },
    { name: "CSS", description: "Linguagem de estilo para definir a aparência de páginas web." },
    { name: "Bootstrap", description: "Framework CSS popular para desenvolvimento web responsivo." },
    { name: "jQuery", description: "Biblioteca JavaScript que simplifica a manipulação do DOM, eventos e AJAX." },
    { name: "REST APIs", description: "Arquitetura de software para criação de APIs web, comumente usada em aplicações web e mobile." },
    { name: "GraphQL", description: "Linguagem de consulta para APIs que permite aos clientes solicitar dados específicos." },
    { name: "Agile", description: "Metodologia de desenvolvimento de software que prioriza a iteração, colaboração e entrega incremental." },
    { name: "Scrum", description: "Framework Agile popular para gestão de projetos de desenvolvimento de software." },
    { name: "Kanban", description: "Método visual para gestão de fluxo de trabalho, usado em desenvolvimento de software e outras áreas." },
    { name: "UI/UX Design", description: "Habilidade de projetar interfaces de usuário intuitivas e atraentes, com foco na experiência do usuário." },
    { name: "Design Thinking", description: "Abordagem centrada no usuário para resolução de problemas e desenvolvimento de produtos e serviços." },
];

const seedSkills = async () => {
    try {
        const skills = [];
        await Skill.deleteMany( {} );

        for ( const data of skillData ) {
            const existingSkill = await Skill.findOne( { skillName: data.name } );
            if ( !existingSkill ) {
                skills.push( {
                    skillName: data.name,
                    skillDescription: data.description,
                } );
            } else {
                console.warn( `Skill '${data.name}' already exists. Skipping.` );
            }
        }

        await Skill.insertMany( skills );
        console.log( `Seeded ${skills.length} skill documents successfully!` );
    } catch ( error ) {
        console.error( "Error seeding Skill data:", error );
    }
};

export default seedSkills;