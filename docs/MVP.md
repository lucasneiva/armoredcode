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
- Clientes podem visualizar, aceitar ou recusar propostas

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
