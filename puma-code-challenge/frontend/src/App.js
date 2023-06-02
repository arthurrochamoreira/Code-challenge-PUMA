import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FaStar, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

function App() {
  const [username, setUsername] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('/api/users');
      setFavorites(response.data);
    } catch (error) {
      // Handle the error here, if necessary
    }
  };

  const showErrorPopup = (message) => {
    setPopupMessage(message);
    setErrorPopupVisible(true);

    setTimeout(() => {
      setErrorPopupVisible(false);
      setPopupMessage('');
    }, 3000);
  };

  const showSuccessPopup = (message) => {
    setPopupMessage(message);
    setSuccessPopupVisible(true);

    setTimeout(() => {
      setSuccessPopupVisible(false);
      setPopupMessage('');
    }, 3000);
  };

  const addUserToFavorites = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const userData = response.data;

      if (favorites.some((user) => user.login === userData.login)) {
        showErrorPopup('Usuário já adicionado à lista de favoritos');
      } else if (favorites.length >= 5) {
        showErrorPopup('Você já atingiu o limite máximo de favoritos');
      } else {
        const newUser = {
          login: userData.login,
          name: userData.name,
          avatar_url: userData.avatar_url,
          html_url: userData.html_url,
          starred: false,
        };

        setFavorites([...favorites, newUser]);
        setUsername('');
        showSuccessPopup('Usuário adicionado à lista de favoritos com sucesso');
      }
    } catch (error) {
      showErrorPopup(error.message);
    }
  };

  const removeUser = (login) => {
    setFavorites(favorites.filter((user) => user.login !== login));
  };

  const toggleStar = (login) => {
    const updatedFavorites = favorites.map((user) =>
      user.login === login ? { ...user, starred: !user.starred } : { ...user, starred: false }
    );

    setFavorites(updatedFavorites);
  };

  const sortFavoritesAsc = () => {
    setFavorites([...favorites].sort((a, b) => a.name.localeCompare(b.name)));
    setSortOrder('asc');
  };

  const sortFavoritesDesc = () => {
    setFavorites([...favorites].sort((a, b) => b.name.localeCompare(a.name)));
    setSortOrder('desc');
  };

  return (
    <div className="body">
      <div className="wave"></div>
      <div className="container">
        <div className="header">
          <h1>Usuários Favoritos do GitHub</h1>
        </div>
        <div className="search-container">
          <div className="add-user">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="search-input"
            />
            <button className="btn-add" onClick={addUserToFavorites}>
              Adicionar
            </button>
            <button className="btn-sort" onClick={sortOrder === 'asc' ? sortFavoritesDesc : sortFavoritesAsc}>
              {sortOrder === 'asc' ? <FaSortAlphaDown className="sort-icon" /> : <FaSortAlphaUp className="sort-icon" />}
            </button>
          </div>
        </div>
        <div className="grid">
          {favorites.map((user) => (
            <div key={user.login} className="card">
              <img src={user.avatar_url} alt={user.name} className="avatar" />
              <div className="card-body">
                <h2 className="name">{user.name}</h2>
                <p className="username">@{user.login}</p>
                <div className="actions">
                  <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="link">
                    Perfil
                  </a>
                  <button
                    className={`btn-star ${user.starred ? 'starred' : ''}`}
                    onClick={() => toggleStar(user.login)}
                  >
                    <FaStar className="star-icon" color={user.starred ? 'yellow' : 'black'} />
                  </button>
                  <button className="btn-remove" onClick={() => removeUser(user.login)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {errorPopupVisible && (
          <div className="popup error-popup">
            <p className="popup-message">{popupMessage}</p>
          </div>
        )}
        {successPopupVisible && (
          <div className="popup success-popup">
            <p className="popup-message">{popupMessage}</p>
          </div>
        )}
        <p className="footer">© 2023 GitHub, Inc.</p>
      </div>
    </div>
  );
}

export default App;
