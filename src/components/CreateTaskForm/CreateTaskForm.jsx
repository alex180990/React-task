import React, { useState } from 'react';

function CreateTaskForm({ onCreateTask }) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données de la nouvelle tâche au composant parent
    onCreateTask(taskData);
    // Réinitialiser le formulaire
    setTaskData({
      title: '',
      description: '',
      completed: false,
    });
  };

  return (
    <div>
      <h2>Créer une nouvelle tâche</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="completed">Terminé :</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={taskData.completed}
            onChange={() =>
              setTaskData({ ...taskData, completed: !taskData.completed })
            }
          />
        </div>
        <button type="submit">Créer la tâche</button>
      </form>
    </div>
  );
}

export default CreateTaskForm;