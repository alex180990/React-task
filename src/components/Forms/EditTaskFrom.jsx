import React, { useState } from 'react';
import TaskService from '/src/service/TaskService';

function EditTaskFrom({ task, onUpdate }) {
  const [formData, setFormData] = useState(task);
  const taskService = new TaskService();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'completed' ? event.target.checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Mettez à jour la tâche avec les données de formData
      await taskService.updateTask(task.id, formData);
  
      // Appelez la fonction onUpdate pour mettre à jour l'état dans le composant parent
      onUpdate(formData);
  
      // Affichez les données du formulaire dans la console
      console.log('Données du formulaire soumises :', formData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>
          Complété :
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">Enregistrer</button>
      </div>
    </form>
  );
}

export default EditTaskFrom;