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

## DatRules do RealTimeDataBase Firebase

Regras Necessárias que deve ser configurado em Rules no RealTimeDataBase.

{
"rules": {
"rooms": {
".read": false,
".write": "auth != null",
"$roomId": {
".read": true,
".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
"questions": {
".read": true,
".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
"likes": {
".read": true,
".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)"
}
}
}
}
}
}

## Efetuando Deploy com Firebase

Caso Deseja Utilizar o Deploy do próprio Firebase aqui vai um resumo de como prosseguir através do próprio Firebase.

### Instale a Firebase CLI

`npm install -g firebase-tools`

Inscreva-se para uma conta Firebase e crie um novo projeto.

Execute

`firebase login`

e faça login com sua conta Firebase criada anteriormente.

Para Inicializar o Projeto no Firebase execute

`firebase init`

Na pasta raiz do seu projeto.

Você precisa escolher o Hosting: configurar e implantar sites do Firebase Hosting e escolher o projeto do Firebase que você criou na etapa anterior. Você precisará concordar em database.rules.json ser criado, escolher build como diretório público e também concordar em Configurar como um aplicativo de página única respondendo com y.

Após finalizar tudo para implantá-lo execute

`firebase deploy.`

Para Ver o passo a passo só verificar o link abaixo que mostra cada detalhe da configuração do Deploy com o Firebase.

[Como Realizar Deploy com Firebase no React](https://create-react-app.dev/docs/deployment/#firebase)

![letmeask gif](https://user-images.githubusercontent.com/60220406/125380385-8147c380-e368-11eb-8141-0fccad7737bf.gif)

### 🚀 Let's code! 🚀
