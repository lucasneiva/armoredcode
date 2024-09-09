## Casos de Uso de Baixo Nível

**Caso de Uso 1: Gerenciar Conta (Login)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Conta (Login) |
| Ator Principal | Cliente ou Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Usuário possui conta cadastrada no sistema. |
| Pós-condições | Usuário autenticado e redirecionado para a área apropriada (Cliente ou Freelancer). |
| Ações do Sistema | 1. Exibe formulário de login com campos para email e senha.<br>2. Valida as credenciais inseridas no banco de dados.<br>3. Em caso de sucesso, gera um token de autenticação (JWT).<br>4. Redireciona o usuário para a área apropriada. |
| Ações do Ator | 1. Insere email e senha no formulário.<br>2. Clica no botão "Entrar". |
| Fluxos Alternativos | - Credenciais inválidas: Exibe mensagem de erro.<br>- Usuário esqueceu a senha: Redireciona para o fluxo de recuperação de senha. |

**Caso de Uso 2: Gerenciar Conta (Logout)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Conta (Logout) |
| Ator Principal | Cliente ou Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Usuário autenticado no sistema. |
| Pós-condições | Sessão do usuário encerrada e redirecionado para a página de login. |
| Ações do Sistema | 1. Invalida o token de autenticação do usuário.<br>2. Redireciona o usuário para a página de login. |
| Ações do Ator | 1. Clica no botão "Sair". |

**Caso de Uso 3: Gerenciar Conta (Recuperar Senha)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Conta (Recuperar Senha) |
| Ator Principal | Cliente ou Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Usuário esqueceu a senha e possui email cadastrado no sistema. |
| Pós-condições | Usuário recebe instruções para redefinir a senha por email. |
| Ações do Sistema | 1. Exibe formulário para inserir o email cadastrado.<br>2. Verifica se o email existe no banco de dados.<br>3. Gera um link único para redefinição de senha.<br>4. Envia email com o link para o usuário.<br>5. Exibe mensagem de sucesso informando que as instruções foram enviadas por email. |
| Ações do Ator | 1. Insere o email no formulário.<br>2. Clica no botão "Enviar". |
| Fluxos Alternativos | - Email não cadastrado: Exibe mensagem de erro. |

**Caso de Uso 4: Gerenciar Perfil de Freelancer (Visualizar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Perfil de Freelancer (Visualizar) |
| Ator Principal | Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Freelancer autenticado no sistema. |
| Pós-condições | Freelancer visualiza as informações do seu perfil. |
| Ações do Sistema | 1. Busca as informações do perfil do Freelancer no banco de dados.<br>2. Exibe as informações do perfil (nome, email, habilidades, etc.). |
| Ações do Ator | 1. Acessa a página de perfil. |

**Caso de Uso 5: Gerenciar Perfil de Freelancer (Editar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Perfil de Freelancer (Editar) |
| Ator Principal | Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Freelancer autenticado no sistema e na página de edição do perfil. |
| Pós-condições |  Informações do perfil do Freelancer atualizadas. |
| Ações do Sistema | 1. Exibe um formulário com as informações atuais do perfil editáveis.<br>2. Valida as informações inseridas.<br>3. Atualiza as informações do perfil no banco de dados.<br>4. Exibe mensagem de sucesso e redireciona para a página de perfil. |
| Ações do Ator | 1. Edita as informações do perfil no formulário.<br>2. Salva as alterações. |
| Fluxos Alternativos | - Dados inválidos: Exibe mensagens de erro. |


**Caso de Uso 6: Gerenciar Perfil de Freelancer (Alterar Senha)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Perfil de Freelancer (Alterar Senha) |
| Ator Principal | Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Freelancer autenticado no sistema e na página de alteração de senha. |
| Pós-condições | Senha do Freelancer atualizada. |
| Ações do Sistema | 1. Exibe um formulário para inserir a senha atual e a nova senha.<br>2. Valida as informações inseridas (senha atual correta, nova senha com formato válido).<br>3. Atualiza a senha do Freelancer no banco de dados.<br>4. Exibe mensagem de sucesso. |
| Ações do Ator | 1. Insere a senha atual e a nova senha no formulário.<br>2. Salva as alterações. |
| Fluxos Alternativos | - Senha atual inválida: Exibe mensagem de erro.<br>- Nova senha com formato inválido: Exibe mensagem de erro. |


**Caso de Uso 7: Gerenciar Perfil de Cliente (Visualizar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Perfil de Cliente (Visualizar) |
| Ator Principal | Cliente |
| Ator Secundário | Sistema |
| Pré-condições | Cliente autenticado no sistema. |
| Pós-condições | Cliente visualiza as informações do seu perfil. |
| Ações do Sistema | 1. Busca as informações do perfil do Cliente no banco de dados.<br>2. Exibe as informações do perfil (nome, email, empresa, etc.). |
| Ações do Ator | 1. Acessa a página de perfil. |


**Caso de Uso 8: Gerenciar Perfil de Cliente (Editar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Perfil de Cliente (Editar) |
| Ator Principal | Cliente |
| Ator Secundário | Sistema |
| Pré-condições | Cliente autenticado no sistema e na página de edição do perfil. |
| Pós-condições | Informações do perfil do Cliente atualizadas. |
| Ações do Sistema | 1. Exibe um formulário com as informações atuais do perfil editáveis.<br>2. Valida as informações inseridas.<br>3. Atualiza as informações do perfil no banco de dados.<br>4. Exibe mensagem de sucesso e redireciona para a página de perfil. |
| Ações do Ator | 1. Edita as informações do perfil no formulário.<br>2. Salva as alterações. |
| Fluxos Alternativos | - Dados inválidos: Exibe mensagens de erro. |

**Caso de Uso 9: Gerenciar Perfil de Cliente (Alterar Senha)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Perfil de Cliente (Alterar Senha) |
| Ator Principal | Cliente |
| Ator Secundário | Sistema |
| Pré-condições | Cliente autenticado no sistema e na página de alteração de senha. |
| Pós-condições | Senha do Cliente atualizada. |
| Ações do Sistema | 1. Exibe um formulário para inserir a senha atual e a nova senha.<br>2. Valida as informações inseridas (senha atual correta, nova senha com formato válido).<br>3. Atualiza a senha do Cliente no banco de dados.<br>4. Exibe mensagem de sucesso. |
| Ações do Ator | 1. Insere a senha atual e a nova senha no formulário.<br>2. Salva as alterações. |
| Fluxos Alternativos | - Senha atual inválida: Exibe mensagem de erro.<br>- Nova senha com formato inválido: Exibe mensagem de erro. |

**Caso de Uso 10: Gerenciar Projetos (Criar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Projetos (Criar) |
| Ator Principal | Cliente |
| Ator Secundário | Sistema |
| Pré-condições | Cliente autenticado no sistema. |
| Pós-condições | Projeto criado e disponível para visualização pelos Freelancers. |
| Ações do Sistema | 1. Exibe formulário de criação de projeto com campos para título, descrição, habilidades desejadas, orçamento, prazo, etc.<br>2. Valida os dados inseridos.<br>3. Salva o novo projeto no banco de dados.<br>4. Exibe a página de detalhes do projeto criado. |
| Ações do Ator | 1. Preenche o formulário de criação de projeto.<br>2. Envia o formulário. |
| Fluxos Alternativos | - Dados inválidos: Exibe mensagens de erro. |


**Caso de Uso 11: Gerenciar Projetos (Editar)** 

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Projetos (Editar) |
| Ator Principal | Cliente |
| Ator Secundário | Sistema |
| Pré-condições | Cliente autenticado e visualizando um projeto que ele criou. |
| Pós-condições |  Informações do projeto atualizadas. |
| Ações do Sistema | 1. Exibe um formulário com as informações atuais do projeto editáveis.<br>2. Valida as informações inseridas.<br>3. Atualiza as informações do projeto no banco de dados.<br>4. Exibe mensagem de sucesso e redireciona para a página de detalhes do projeto. |
| Ações do Ator | 1. Edita as informações do projeto no formulário.<br>2. Salva as alterações. |
| Fluxos Alternativos | - Dados inválidos: Exibe mensagens de erro. |


**Caso de Uso 12: Gerenciar Projetos (Visualizar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Projetos (Visualizar) |
| Ator Principal | Cliente ou Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Usuário autenticado. |
| Pós-condições | Usuário visualiza os detalhes do projeto. |
| Ações do Sistema | 1. Busca as informações do projeto no banco de dados.<br>2. Exibe os detalhes do projeto (título, descrição, habilidades, orçamento, etc.). |
| Ações do Ator | 1. Acessa a página de detalhes do projeto. |

**Caso de Uso 13: Gerenciar Projetos (Finalizar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Projetos (Finalizar) |
| Ator Principal | Cliente |
| Ator Secundário | Sistema |
| Pré-condições | Cliente autenticado e visualizando um projeto que ele criou. |
| Pós-condições | Projeto marcado como finalizado e não está mais disponível para novas propostas. |
| Ações do Sistema | 1.  Atualiza o status do projeto no banco de dados para "finalizado".<br>2.  Remove o projeto da lista de projetos disponíveis (opcional). |
| Ações do Ator | 1. Clica no botão "Finalizar Projeto".<br>2. Confirma a ação. |


**Caso de Uso 14: Gerenciar Propostas (Enviar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Propostas (Enviar) |
| Ator Principal | Freelancer |
| Ator Secundário | Sistema, Cliente |
| Pré-condições | Freelancer autenticado e visualizando um projeto. |
| Pós-condições | Proposta enviada ao Cliente e associada ao projeto. |
| Ações do Sistema | 1. Exibe formulário de proposta com campos para valor, prazo estimado e descrição da proposta.<br>2. Valida os dados inseridos.<br>3. Salva a proposta no banco de dados, associada ao projeto e ao Freelancer.<br>4. Notifica o Cliente sobre a nova proposta (opcional). |
| Ações do Ator | 1. Preenche o formulário de proposta.<br>2. Envia a proposta. |
| Fluxos Alternativos | - Dados inválidos: Exibe mensagens de erro. |


**Caso de Uso 15: Gerenciar Propostas (Visualizar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Propostas (Visualizar) |
| Ator Principal | Cliente ou Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Usuário autenticado. |
| Pós-condições | Usuário visualiza os detalhes da proposta. |
| Ações do Sistema | 1. Busca as informações da proposta no banco de dados.<br>2. Exibe os detalhes da proposta (valor, prazo, descrição). |
| Ações do Ator | 1. Acessa a página de detalhes da proposta. |


**Caso de Uso 16: Gerenciar Propostas (Editar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Propostas (Editar) |
| Ator Principal | Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Freelancer autenticado e visualizando uma proposta que ele enviou e que ainda não foi aceita/recusada. |
| Pós-condições |  Informações da proposta atualizadas. |
| Ações do Sistema | 1. Exibe um formulário com as informações atuais da proposta editáveis.<br>2. Valida as informações inseridas.<br>3. Atualiza as informações da proposta no banco de dados.<br>4. Exibe mensagem de sucesso e redireciona para a página de detalhes da proposta. |
| Ações do Ator | 1. Edita as informações da proposta no formulário.<br>2. Salva as alterações. |
| Fluxos Alternativos | - Dados inválidos: Exibe mensagens de erro. |

**Caso de Uso 17: Gerenciar Propostas (Cancelar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Propostas (Cancelar) |
| Ator Principal | Freelancer |
| Ator Secundário | Sistema, Cliente |
| Pré-condições | Freelancer autenticado e visualizando uma proposta que ele enviou e que ainda não foi aceita/recusada. |
| Pós-condições | Proposta marcada como cancelada e removida da lista de propostas ativas. |
| Ações do Sistema | 1.  Atualiza o status da proposta no banco de dados para "cancelada".<br>2.  Remove a proposta da lista de propostas ativas do projeto.<br>3. Notifica o Cliente sobre o cancelamento (opcional). |
| Ações do Ator | 1. Clica no botão "Cancelar Proposta".<br>2. Confirma a ação. |


**Caso de Uso 18: Gerenciar Propostas (Aceitar/Recusar)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Propostas (Aceitar/Recusar) |
| Ator Principal | Cliente |
| Ator Secundário | Sistema, Freelancer |
| Pré-condições | Cliente autenticado e visualizando uma proposta. |
| Pós-condições | Proposta marcada como aceita ou recusada. Se aceita, inicia a comunicação entre Cliente e Freelancer. |
| Ações do Sistema | 1.  Atualiza o status da proposta no banco de dados (aceita ou recusada).<br>2. Notifica o Freelancer sobre a decisão (opcional).<br>3. Se aceita, cria um canal de comunicação para o projeto. |
| Ações do Ator | 1. Clica no botão "Aceitar" ou "Recusar". |

**Caso de Uso 19: Gerenciar Mensagens (Visualizar Conversas)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Mensagens (Visualizar Conversas) |
| Ator Principal | Cliente ou Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Usuário autenticado. |
| Pós-condições |  Usuário visualiza a lista de conversas (projetos) com os quais está envolvido. |
| Ações do Sistema | 1. Busca as conversas (projetos com propostas aceitas) do usuário no banco de dados.<br>2. Exibe a lista de conversas, mostrando o nome do projeto e a última mensagem de cada conversa. |
| Ações do Ator | 1. Acessa a página de mensagens. |

**Caso de Uso 20: Gerenciar Mensagens (Abrir Conversa)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Mensagens (Abrir Conversa) |
| Ator Principal | Cliente ou Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Usuário autenticado e visualizando a lista de conversas. |
| Pós-condições |  Usuário visualiza as mensagens trocadas em uma conversa específica. |
| Ações do Sistema | 1. Busca as mensagens da conversa selecionada no banco de dados.<br>2. Exibe as mensagens em ordem cronológica, identificando o remetente de cada mensagem. |
| Ações do Ator | 1. Clica em uma conversa na lista de conversas. |

**Caso de Uso 21: Gerenciar Mensagens (Enviar Mensagem)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Mensagens (Enviar Mensagem) |
| Ator Principal | Cliente ou Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Usuário autenticado e visualizando uma conversa aberta. |
| Pós-condições | Mensagem enviada e adicionada à conversa. |
| Ações do Sistema | 1.  Recebe a mensagem digitada pelo usuário.<br>2.  Salva a mensagem no banco de dados, associada à conversa.<br>3.  Atualiza a interface da conversa com a nova mensagem. <br>4. Envia notificação ao outro participante da conversa (opcional). |
| Ações do Ator | 1. Digita a mensagem no campo de texto.<br>2. Clica no botão "Enviar". |


**Caso de Uso 22: Gerenciar Convites (Visualizar Convites)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Convites (Visualizar Convites) |
| Ator Principal | Freelancer |
| Ator Secundário | Sistema |
| Pré-condições | Freelancer autenticado. |
| Pós-condições | Freelancer visualiza a lista de convites recebidos. |
| Ações do Sistema | 1. Busca os convites enviados ao Freelancer no banco de dados.<br>2. Exibe a lista de convites, mostrando o nome do projeto, o cliente que enviou e a data do convite. |
| Ações do Ator | 1. Acessa a página de convites. |

**Caso de Uso 23: Gerenciar Convites (Enviar Convite)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Convites (Enviar Convite) |
| Ator Principal | Cliente |
| Ator Secundário | Sistema, Freelancer |
| Pré-condições | Cliente autenticado e visualizando o perfil de um Freelancer. |
| Pós-condições | Convite enviado ao Freelancer para um projeto específico. |
| Ações do Sistema | 1. Exibe uma interface para o Cliente selecionar o projeto para o qual o convite se refere.<br>2. Cria um convite no banco de dados, associado ao Cliente, Freelancer e projeto.<br>3. Envia uma notificação ao Freelancer sobre o convite. |
| Ações do Ator | 1. Clica no botão "Enviar Convite".<br>2. Seleciona o projeto relevante.<br>3. Confirma o envio do convite. |

**Caso de Uso 24: Gerenciar Convites (Aceitar/Recusar Convite)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Convites (Aceitar/Recusar Convite) |
| Ator Principal | Freelancer |
| Ator Secundário | Sistema, Cliente |
| Pré-condições | Freelancer autenticado e visualizando um convite. |
| Pós-condições | Convite marcado como aceito ou recusado. Se aceito, redireciona o Freelancer para a página de envio de proposta. |
| Ações do Sistema | 1. Atualiza o status do convite no banco de dados (aceito ou recusado).<br>2. Notifica o Cliente sobre a decisão (opcional).<br>3. Se aceito, redireciona o Freelancer para a página de envio de proposta para o projeto correspondente. |
| Ações do Ator | 1. Clica no botão "Aceitar" ou "Recusar". |

**Descrição do Caso de Uso 25: Gerenciar Projetos (Buscar Freelancers)**

| Campo | Descrição |
|---|---|
| Caso de Uso | Gerenciar Projetos (Buscar Freelancers) |
| Ator Principal | Cliente |
| Ator Secundário | Sistema |
| Pré-condições | Cliente autenticado no sistema. |
| Pós-condições | Cliente visualiza uma lista de freelancers que correspondem aos critérios de busca. |
| Ações do Sistema | 1. Exibe uma interface de busca com filtros para habilidades, experiência, localização, etc.<br>2. Busca freelancers no banco de dados que correspondem aos critérios.<br>3. Exibe uma lista de freelancers encontrados com informações resumidas (nome, habilidades, experiência, etc.). |
| Ações do Ator | 1. Define os critérios de busca (opcional).<br>2. Inicia a busca. |
| Fluxos Alternativos | - Nenhum freelancer encontrado: Exibe mensagem informando que não foram encontrados freelancers que atendam aos critérios. |

1. Gerenciar Conta (Login)
2. Gerenciar Conta (Logout)
3. Gerenciar Conta (Recuperar Senha)
4. Gerenciar Perfil de Freelancer (Visualizar)
5. Gerenciar Perfil de Freelancer (Editar)
6. Gerenciar Perfil de Freelancer (Alterar Senha)
7. Gerenciar Perfil de Cliente (Visualizar)
8. Gerenciar Perfil de Cliente (Editar)
9. Gerenciar Perfil de Cliente (Alterar Senha)
10. Gerenciar Projetos (Criar)
11. Gerenciar Projetos (Editar)
12. Gerenciar Projetos (Visualizar)
13. Gerenciar Projetos (Finalizar)
14. Gerenciar Projetos (Buscar Freelancers)
15. Gerenciar Propostas (Enviar)
16. Gerenciar Propostas (Visualizar)
17. Gerenciar Propostas (Editar)
18. Gerenciar Propostas (Cancelar)
19. Gerenciar Propostas (Aceitar/Recusar)
20. Gerenciar Mensagens (Visualizar Conversas)
21. Gerenciar Mensagens (Abrir Conversa)
22. Gerenciar Mensagens (Enviar Mensagem)
23. Gerenciar Convites (Visualizar Convites)
24. Gerenciar Convites (Enviar Convite)
25. Gerenciar Convites (Aceitar/Recusar Convite)
