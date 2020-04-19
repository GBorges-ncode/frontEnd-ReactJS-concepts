import React, { useState, useEffect } from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const resp = await api.post('repositories', {
      title: `New project ${Date.now()}`,
      owner: "Gilberto Borges"
    });

    const repository = resp.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const index = repositories.findIndex(repository => repository.id === id);
    console.log(index);

    repositories.splice(index, 1);

    await api.delete(`repositories/${id}`);

    setRepositories([...repositories]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
