# API de Tarefas

API simples de gerenciamento de tarefas feita com Express e TypeScript.

## Visao geral

O projeto expoe endpoints para criar, listar, buscar, atualizar e remover tarefas.

As tarefas sao mantidas em memoria no repository atual, entao os dados sao perdidos quando a aplicacao reinicia.

## Tecnologias

- Node.js
- Express
- TypeScript
- Yup para validacao
- Multer para upload de arquivo
- UUID para gerar identificadores

## Como executar

1. Instale as dependencias:

    npm install

2. Inicie em modo desenvolvimento:

    npm run dev

3. Para compilar o projeto:

    npm run build

O servidor sobe na porta 3000.

## Endpoints

### GET /task

Lista tarefas filtrando pelo status informado na query.

Query:

- status: completo, pendente ou cancelado

Exemplo:

    GET /task?status=pendente

Resposta de sucesso:

    [
      {
        "id": "uuid-da-tarefa",
        "descricao": "Estudar TypeScript",
        "data": "2026-04-22",
        "status": "pendente"
      }
    ]

### GET /task/:id

Busca uma tarefa pelo id.

Parametro de rota:

- id: UUID da tarefa

Exemplo:

    GET /task/550e8400-e29b-41d4-a716-446655440000

Resposta de sucesso:

    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "descricao": "Estudar TypeScript",
      "data": "2026-04-22",
      "status": "pendente"
    }

### POST /task

Cria uma nova tarefa.

O endpoint aceita multipart/form-data por causa do upload com Multer. O arquivo enviado no campo file e armazenado na pasta uploads/.

Campos do body:

- descricao: string obrigatoria
- data: string obrigatoria
- status: completo, pendente ou cancelado

Exemplo de payload:

    descricao=Estudar TypeScript
    data=2026-04-22
    status=pendente

Resposta de sucesso:

    {
      "descricao": "Estudar TypeScript",
      "data": "2026-04-22",
      "status": "pendente",
      "id": "uuid-gerado"
    }

### PUT /task

Atualiza uma tarefa existente.

Campos do body:

- id: id da tarefa
- descricao: string obrigatoria
- data: string obrigatoria
- status: completo, pendente ou cancelado

Exemplo de payload:

    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "descricao": "Estudar API",
      "data": "2026-04-23",
      "status": "completo"
    }

Resposta de sucesso:

    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "descricao": "Estudar API",
      "data": "2026-04-23",
      "status": "completo"
    }

### DELETE /task/:id

Remove uma tarefa pelo id.

Parametro de rota:

- id: identificador da tarefa

Exemplo:

    DELETE /task/550e8400-e29b-41d4-a716-446655440000

Resposta de sucesso:

    0

## Regras de validacao

- status aceita apenas completo, pendente ou cancelado
- GET /task/:id espera um UUID valido
- descricao e data sao obrigatorios no cadastro e na atualizacao
- id e obrigatorio na atualizacao

## Estrutura do projeto

- index.ts: inicializacao do servidor
- routes.ts: definicao das rotas
- src/controllers/TaskController.ts: camada de controle das requisicoes
- src/services/TaskService.ts: regra de negocio
- src/repositories/TaskRepository.ts: armazenamento em memoria
- src/schemas/TaskSchema.ts: validacoes com Yup
- src/models/Task.ts: tipo da tarefa
- src/utils/storage.ts: configuracao do upload com Multer

## Observacoes

- Nao existe autenticacao efetiva nas rotas atuais.
- O middleware de auth existe no arquivo de rotas, mas nao esta aplicado.
- Como o repository usa array em memoria, qualquer reinicio limpa os dados cadastrados.
