const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const favorites = [];

// Função auxiliar para verificar se um usuário já está na lista de favoritos
function isUserFavorite(username) {
  return favorites.some((user) => user.username === username);
}

// Função auxiliar para obter um usuário favorito pelo nome de usuário
function getFavoriteUser(username) {
  return favorites.find((user) => user.username === username);
}

// Função auxiliar para ordenar a lista de favoritos por nome de usuário
function sortFavorites() {
  favorites.sort((a, b) => a.name.localeCompare(b.name));
}

// Endpoint para adicionar um usuário à lista de favoritos
app.post('/users', async (req, res) => {
  const { username, name, avatar, url } = req.body;

  if (favorites.length >= 5) {
    return res.status(400).json({ error: 'Limite de favoritos alcançado' });
  }

  if (isUserFavorite(username)) {
    return res.status(400).json({ error: 'Usuário já adicionado à lista de favoritos' });
  }

  const user = {
    username,
    name,
    avatar,
    url,
    starred: false,
  };

  favorites.push(user);
  sortFavorites();

  res.json(user);
});

// Endpoint para listar os usuários favoritos
app.get('/users', (req, res) => {
  res.json(favorites);
});

// Endpoint para remover um usuário da lista de favoritos
app.delete('/users/:username', (req, res) => {
  const { username } = req.params;
  const index = favorites.findIndex((user) => user.username === username);

  if (index === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado na lista de favoritos' });
  }

  favorites.splice(index, 1);
  res.sendStatus(204);
});

// Endpoint para marcar/desmarcar um usuário como favorito
app.patch('/users/:username/toggle-star', (req, res) => {
  const { username } = req.params;
  const user = getFavoriteUser(username);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado na lista de favoritos' });
  }

  favorites.forEach((u) => {
    if (u.starred) {
      u.starred = false;
    }
  });

  user.starred = true;
  sortFavorites();

  res.json(user);
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
