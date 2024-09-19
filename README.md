# ArmoredCode

## O Problema

Empresas de Sorocaba, especialmente as menores ou startups, muitas vezes têm dificuldades para encontrar desenvolvedores de software qualificados na região. Ao mesmo tempo, estudantes e recém-formados que buscam entrar na indústria de tecnologia enfrentam desafios para adquirir experiência prática e se conectar com potenciais empregadores.

## A Solução

O ArmoredCode resolve esse problema fornecendo uma plataforma feita sob medida para a região de Sorocaba. Nós conectamos empresas a talentos locais de desenvolvimento de software, com foco na criação de oportunidades para que estudantes e recém-formados desenvolvam suas habilidades e portfólios.

## Público-Alvo

**Freelancers:**

- Estudantes de Ciência da Computação, Engenharia de Software e áreas relacionadas.
- Recém-formados em busca de vagas de nível inicial em desenvolvimento de software.
- Desenvolvedores autodidatas que buscam expandir sua rede profissional.
- Desenvolvedores experientes à procura de projetos freelance na região de Sorocaba.

**Clientes:**

- Startups e pequenas empresas que precisam de expertise em desenvolvimento de software.
- Empresas estabelecidas buscando recursos adicionais de desenvolvimento.
- Organizações com projetos adequados para estudantes ou estagiários.
- Qualquer pessoa em Sorocaba com uma necessidade de desenvolvimento de software.

## Como Funciona o ArmoredCode

- Clientes podem postar descrições detalhadas de projetos, destacando escopo, orçamento e habilidades necessárias.
- Freelancers exibem suas habilidades, formação, experiência e portfólio de trabalhos.
- Uma ferramenta de busca poderosa permite que clientes encontrem freelancers adequados com base em critérios específicos.
- Freelancers podem enviar propostas para projetos, detalhando sua abordagem e valores.

## Definição do MVP (Minimum Viable Product)

### 1. Cadastro e Autenticação de Usuários
- Registro de freelancers e clientes
- Login e autenticação usando JWT (JSON Web Tokens)
- Perfis de usuário com informações relevantes

### 2. Projetos
- Criação de projetos pelos clientes
- Visualização de detalhes do projeto
- Listagem de projetos disponíveis

### 3. Sistema de Busca
- Busca de projetos pelos freelancers
- Busca de perfis de freelancers pelos clientes
- Filtros básicos para refinar as buscas

### 4. Sistema de Propostas
- Freelancers podem enviar propostas para projetos
- Cada proposta inclui: valor proposto, prazo estimado e descrição do plano de trabalho
- Cliente podem vizualizar as propostas por projeto
- Clientes podem aceitar ou recusar propostas
- Ao recusar uma proposta o cliente deve escrever o motivo

### 5. Comunicação
- Canal de comunicação único para cada proposta
- Troca de mensagens entre cliente e freelancer
- O canal permanece ativo se a proposta for aceita, permitindo comunicação durante o projeto
- Canais de propostas recusadas são marcados como inativos, mas permanecem acessíveis para referência

### 6. Convites para Proposta
- Clientes podem enviar "convites para proposta" a freelancers específicos
- Freelancers recebem notificações de convites e podem optar por enviar uma proposta

### Modelos de Dados Principais
1. Usuário (com subtipos Cliente e Freelancer)
2. Projeto
3. Proposta
4. Mensagem
5. Convite para Proposta

### APIs Principais (Backend)
- Autenticação: registro, login
- Projetos: CRUD, listagem, busca
- Propostas: criação, edição, aceitação/recusa, listagem
- Mensagens: criação, listagem por proposta
- Convites: criação, listagem, aceitação/recusa

### Principais Telas e Componentes (Frontend)
1. Autenticação
   - Tela de Login
   - Tela de Registro (com opção para escolher entre Cliente e Freelancer)

2. Perfil de Usuário
   - Visualização de Perfil
   - Edição de Perfil

3. Projetos
   - Lista de Projetos (com filtros de busca)
   - Detalhes do Projeto
   - Formulário de Criação/Edição de Projeto (para Clientes)

4. Propostas
   - Lista de Propostas (para um projeto específico)
   - Detalhes da Proposta
   - Formulário de Criação de Proposta (para Freelancers)

5. Comunicação
   - Interface de Chat (para cada proposta)
   - Lista de Conversas Ativas

6. Busca
   - Interface de Busca de Projetos (para Freelancers)
   - Interface de Busca de Freelancers (para Clientes)

7. Convites
   - Interface para Envio de Convites (para Clientes)
   - Lista de Convites Recebidos (para Freelancers)

8. Dashboard
   - Visão geral para Clientes (projetos ativos, propostas recebidas)
   - Visão geral para Freelancers (projetos em andamento, propostas enviadas)

### Considerações Técnicas
- Backend: Node.js com Express.js
- Banco de Dados: MongoDB com Mongoose para ODM
- Autenticação: JWT (JSON Web Tokens)
- Frontend: Angular
  - Componentes reutilizáveis para elementos comuns (ex: cards de projeto, formulários)
  - Serviços para comunicação com a API backend
  - Roteamento para navegação entre diferentes telas
- API RESTful com operações CRUD básicas
- Testes manuais utilizando Thunder Client para o backend

##  Instruções para Rodar o Projeto

### Pré-requisitos:

- **Node.js e npm:** Certifique-se de ter o Node.js e o npm instalados em sua máquina. Você pode baixá-los em [https://nodejs.org/](https://nodejs.org/).
- **Yarn:** É recomendado usar o Yarn como gerenciador de pacotes para este projeto. Instale-o globalmente usando o comando `npm install -g yarn`.
- **MongoDB:** Tenha o MongoDB instalado e em execução. Você pode baixá-lo em [https://www.mongodb.com/](https://www.mongodb.com/).

### Configuração do Projeto:

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/lucas/armoredcode.git
   ```
2. **Instalar as Dependências:**
   ```bash
   yarn install
   ```
3. **Configurar Variáveis de Ambiente:**
   - Criar um arquivo `.env` dentro da pasta `api` com o seguinte conteúdo, substituindo os valores entre `< >` pelas suas informações:
   ```
   MONGO_URL=<sua_string_de_conexao_do_mongodb> 
   JWT_SECRET=<sua_chave_secreta_jwt> 
   LIVE_URL=<url_do_seu_frontend> 
   ```
4. **Iniciar o Servidor:**
   ```bash
   yarn start 
   ```
   Isso iniciará o servidor backend.
5. **Iniciar o Frontend (Angular):**
   ```bash
   cd cliente 
   yarn start 
   ```
   Isso iniciará o servidor de desenvolvimento do Angular.

   Agora você pode acessar o aplicativo em seu navegador, geralmente em `http://localhost:4200/`. 

