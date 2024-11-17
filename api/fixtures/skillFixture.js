import Skill from "../models/skillModel.js";

const skillData = [
    // Hard Skills (Alphabetical Order)
    { name: "Agile", description: "Metodologia de desenvolvimento ágil.", image: "assets/images/agile.svg"},
    { name: "Angular", description: "Framework JavaScript para front-end.", image: "assets/images/angular.svg"},
    { name: "AWS", description: "Plataforma de nuvem da Amazon.", image: "assets/images/aws.svg"},
    { name: "Azure", description: "Plataforma de nuvem da Microsoft.", image: "assets/images/azure.svg"},
    { name: "Bootstrap", description: "Framework CSS para web responsivo.", image: "assets/images/bootstrap.svg"},
    { name: "C#", description: "Linguagem da Microsoft para .NET.", image: "assets/images/c#.svg"},
    { name: "C++", description: "Linguagem para jogos e alto desempenho.", image: "assets/images/c++.svg"},
    { name: "CSS", description: "Linguagem de estilo para web.", image: "assets/images/css.svg"},
    { name: "Design Thinking", description: "Abordagem centrada no usuário.", image: "assets/images/design-thinking.svg"},
    { name: "Docker", description: "Plataforma para conteinerização.", image: "assets/images/docker.svg"},
    { name: "Express.js", description: "Framework web para Node.js.", image: "assets/images/express.svg"},
    { name: "Flutter", description: "SDK Google para mobile multiplataforma.", image: "assets/images/flutter.svg"},
    { name: "Git", description: "Sistema de controle de versão.", image: "assets/images/git.svg"},
    { name: "Google Cloud", description: "Plataforma de nuvem do Google.", image: "assets/images/google-cloud.svg"},
    { name: "GraphQL", description: "Linguagem de consulta para APIs.", image: "assets/images/graphql.svg"},
    { name: "HTML", description: "Linguagem de marcação web.", image: "assets/images/html.svg"},
    { name: "Java", description: "Linguagem para Android e back-end.", image: "assets/images/java.svg"},
    { name: "JavaScript", description: "Linguagem para web front-end e back-end.", image: "assets/images/javascript.svg"},
    
    { name: "Kotlin", description: "Linguagem moderna para Android.", "image": "assets/images/kotlin.svg" },
    { name: "Node.js", description: "Ambiente de execução JavaScript.", "image": "assets/images/nodejs.svg" },
    { name: "NoSQL", description: "Bancos de dados não relacionais.", "image": "assets/images/nosql.svg" },
    { name: "PHP", description: "Linguagem para web back-end.", "image": "assets/images/php.svg" },
    { name: "Python", description: "Linguagem versátil para ciência de dados, etc.", "image": "assets/images/python.svg" },
    { name: "React", description: "Biblioteca JavaScript para UI.", "image": "assets/images/react.svg" },
    { name: "React Native", description: "Framework para mobile multiplataforma.", "image": "assets/images/react-native.svg" },
    { name: "REST APIs", description: "Arquitetura para APIs web.", "image": "assets/images/rest-apis.svg" },
    { name: "Scrum", description: "Framework Agile para gestão de projetos.", "image": "assets/images/scrum.svg" },
    { name: "SQL", description: "Linguagem para bancos de dados relacionais.", "image": "assets/images/sql.svg" },
    { name: "Swift", description: "Linguagem da Apple para iOS, macOS, etc.", "image": "assets/images/swift.svg" },
    { name: "UI/UX Design", description: "Design de interfaces de usuário.", "image": "assets/images/ui-ux-design.svg" },
    { name: "Vue.js", description: "Framework JavaScript para front-end.", "image": "assets/images/vuejs.svg" }
    /*
    { name: "jQuery", description: "Biblioteca JavaScript para DOM e AJAX.", image: "assets/images/jquery.svg" },
    { name: "Kanban", description: "Método visual para fluxo de trabalho.", image: "assets/images/kanban.svg" },
    { name: "Kotlin", description: "Linguagem moderna para Android." },
    { name: "Node.js", description: "Ambiente de execução JavaScript." },
    { name: "NoSQL", description: "Bancos de dados não relacionais." },
    { name: "PHP", description: "Linguagem para web back-end." },
    { name: "Python", description: "Linguagem versátil para ciência de dados, etc." },
    { name: "React", description: "Biblioteca JavaScript para UI." },
    { name: "React Native", description: "Framework para mobile multiplataforma." },
    { name: "REST APIs", description: "Arquitetura para APIs web." },
    { name: "Scrum", description: "Framework Agile para gestão de projetos." },
    { name: "SQL", description: "Linguagem para bancos de dados relacionais." },
    { name: "Swift", description: "Linguagem da Apple para iOS, macOS, etc." },
    { name: "UI/UX Design", description: "Design de interfaces de usuário." },
    { name: "Vue.js", description: "Framework JavaScript para front-end." },
    */
    // Soft Skills (Alphabetical Order)
    { name: "Adaptabilidade", description: "Ajusta-se a mudanças com foco." },
    { name: "Aprendizado Contínuo", description: "Busca novos conhecimentos." },
    { name: "Comunicação", description: "Expressa-se com clareza." },
    { name: "Criatividade", description: "Gera ideias inovadoras." },
    { name: "Empatia", description: "Compreende os outros." },
    { name: "Gerenciamento de Tempo", description: "Organiza tarefas e prazos." },
    { name: "Inteligência Emocional", description: "Gerencia emoções." },
    { name: "Liderança", description: "Inspira e guia equipes." },
    { name: "Negociação", description: "Busca soluções benéficas." },
    { name: "Pensamento Crítico", description: "Avalia informações." },
    { name: "Resolução de Problemas", description: "Soluciona problemas." },
    { name: "Resiliência", description: "Supera desafios." },
    { name: "Trabalho em Equipe", description: "Colabora efetivamente." },
];

const seedSkills = async () => {
    try {
        const skills = [];
        await Skill.deleteMany({});

        for (const data of skillData) {
            const existingSkill = await Skill.findOne({ skillName: data.name });
            if (!existingSkill) {
                skills.push({
                    skillName: data.name,
                    skillDescription: data.description,
                    skillImage: data.image,
                });
            } else {
                console.warn(`Skill '${data.name}' already exists. Skipping.`);
            }
        }

        await Skill.insertMany(skills);
        console.log(`Seeded ${skills.length} skill documents successfully!`);
    } catch (error) {
        console.error("Error seeding Skill data:", error);
    }
};

export default seedSkills;