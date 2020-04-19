import React, { useState, useEffect } from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  // Render information at page loading
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  // Function to add to the api
  async function handleAddRepository() {
    const resp = await api.post('repositories', {
      title: `New project ${Date.now()}`,
      owner: "Gilberto Borges"
    });

    const repository = resp.data;

    setRepositories([...repositories, repository]);
  }

  // Function to delte from the api
  async function handleRemoveRepository(id) {
    // Find the index in the array
    const index = repositories.findIndex(repository => repository.id === id);

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
