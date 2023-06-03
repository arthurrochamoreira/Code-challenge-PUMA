# Usuários Favoritos do GitHub

Este projeto é uma aplicação web que permite ao usuário buscar usuários do GitHub e adicioná-los a uma lista de favoritos. A aplicação é dividida em duas partes principais: o servidor backend e o aplicativo frontend.

## Backend

O servidor backend foi construído usando Node.js com o framework Express.js e a biblioteca Cors. Ele contém uma lista para armazenar os usuários favoritos e várias funções utilitárias para gerenciar essa lista.

## Os principais endpoints da API são:

- POST /api/users: Adiciona um usuário à lista de favoritos. O corpo da solicitação deve conter as informações do usuário (username, name, avatar_url, html_url). Se a lista já contém 5 usuários ou o usuário já está na lista, um erro será retornado.

- GET /api/users: Retorna a lista de usuários favoritos.

- DELETE /api/users/:username: Remove um usuário da lista de favoritos. Se o usuário não for encontrado na lista, um erro será retornado.

- PATCH /api/users/:username/toggle-star: Marca ou desmarca um usuário como favorito. Se o usuário não for encontrado na lista, um erro será retornado.

## Frontend
O aplicativo frontend foi construído com React e usa a biblioteca Axios para fazer solicitações HTTP.

A interface do usuário inclui um campo de entrada de texto para o nome de usuário do GitHub e um botão para adicionar o usuário aos favoritos. Ele renderiza uma lista de usuários favoritos com informações relevantes e opções para estrelar, desestrelar e remover usuários.

## Como Executar a Aplicação

Siga as etapas abaixo para executar a aplicação:

### Frontend

1. Navegue até a pasta `frontend` no terminal ou prompt de comando.
2. Execute o seguinte comando para instalar as dependências do frontend:
   ```
   npm install
   ```
3. Após a conclusão da instalação, execute o comando a seguir para iniciar o servidor de desenvolvimento:
   ```
   npm start
   ```
4. O frontend será iniciado e estará acessível em `http://localhost:3000` no navegador.

### Backend

1. Navegue até a pasta `backend` no terminal ou prompt de comando.
2. Execute o seguinte comando para instalar as dependências do backend:
   ```
   npm install
   ```
3. Após a conclusão da instalação, execute o comando a seguir para iniciar o servidor backend:
   ```
   npm start
   ```
4. O backend estará em execução e pronto para receber as requisições da aplicação frontend.

Certifique-se de ter o Node.js e o npm instalados em sua máquina antes de executar a aplicação.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE.md para detalhes.
