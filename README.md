# NLW/Together - Projeto Salas de Q&A ao-vivo - Integração com Firebase

Este Projeto foi desenvolvido na NLW Together na trilha de React, a aplicação desenvolvida se trata de um sistema para gerenciar e controlar dúvidas durante alguma apresentação ao-vivo.
Os usuários podem adicionar perguntas, enquanto o Administrador pode criar a Sala e mandar o código da mesma para os usuários fazerem as perguntas, enquanto também pode remover, curtir, destacar alguma pergunta e até após a reunião fechar a Sala.

Este Projeto se usou muito dos Hooks do React e foi totalmente focado na integração com o Firebase utilizando de seu Banco de Dados Real Time até seu Deploy.

### Ferramentas Utilizadas na Criação do Projeto

-   [Firebase RealTime Database](https://firebase.google.com/docs/database).
    O Firebase RealTime Database é um banco de dados hospedado na nuvem. Os dados são armazenados como JSON e sincronizados em tempo real com todos os clientes conectados.

## Como Rodar o Projeto ?

Após Clonar o Projeto, já em sua maquina utilize o seguinte comando para baixar suas dependências.

### `yarn`

Para Baixar as Dependências do Projeto

### `yarn start`

Para Inicializar o Projeto
Abrir [http://localhost:3000](http://localhost:3000) visualizar no Navegador.

## Configurando as variáveis ambiente

Crie um Arquivo Chamado .env.local na sua pasta raiz do Projeto passando os parâmetros após ter criado seu projeto no [firebase](https://console.firebase.google.com/).

`REACT_APP_API_KEY=""`
`REACT_APP_AUTH_DOMAIN=""`
`REACT_APP_DATABASE_URL=""`
`REACT_APP_PROJECT_ID=""`
`REACT_APP_STORAGE_BUCKET=""`
`REACT_APP_MESSAGING_SENDER_ID=""`
`REACT_APP_APP_ID=""`

### 🚀 Let's code! 🚀
