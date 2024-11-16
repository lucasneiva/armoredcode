import Skill from "../models/skillModel.js";

const skillData = [
    // Hard Skills (Alphabetical Order)
    { name: "Agile", description: "Metodologia de desenvolvimento ágil." },
    { name: "Angular", description: "Framework JavaScript para front-end." },
    { name: "AWS", description: "Plataforma de nuvem da Amazon." },
    { name: "Azure", description: "Plataforma de nuvem da Microsoft." },
    { name: "Bootstrap", description: "Framework CSS para web responsivo." },
    { name: "C#", description: "Linguagem da Microsoft para .NET." },
    { name: "C++", description: "Linguagem para jogos e alto desempenho." },
    { name: "CSS", description: "Linguagem de estilo para web." },
    { name: "Design Thinking", description: "Abordagem centrada no usuário." },
    { name: "Docker", description: "Plataforma para conteinerização." },
    { name: "Express.js", description: "Framework web para Node.js." },
    { name: "Flutter", description: "SDK Google para mobile multiplataforma." },
    { name: "Git", description: "Sistema de controle de versão." },
    { name: "Google Cloud", description: "Plataforma de nuvem do Google." },
    { name: "GraphQL", description: "Linguagem de consulta para APIs." },
    { name: "HTML", description: "Linguagem de marcação web." },
    { name: "Java", description: "Linguagem para Android e back-end." },
    { name: "JavaScript", description: "Linguagem para web front-end e back-end." },
    { name: "jQuery", description: "Biblioteca JavaScript para DOM e AJAX." },
    { name: "Kanban", description: "Método visual para fluxo de trabalho." },
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