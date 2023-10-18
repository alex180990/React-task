import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import TaskService from '/src/service/TaskService';
import CreateTaskForm from '/src/components/CreateTaskForm/CreateTaskForm';


function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const taskService = new TaskService();
        const fetchedTasks = await taskService.getAllTasks();
        const sortedTasks = fetchedTasks[0].sort((a, b) => a.title.localeCompare(b.title));
        setTasks(sortedTasks);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
    fetchTasks();
  }, []);

  const onCreateTask = async (formData) => {
    try {
      const taskService = new TaskService();
      const newTask = await taskService.createTask(formData); // Utilisez la méthode de création de tâche appropriée
      setTasks([...tasks, newTask]); // Ajoutez la nouvelle tâche à la liste des tâches
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
    }
  };

  return (
    <div className="task-list">
      <h1>Liste des Tâches</h1>
      <ul>
        <li>
            <span>Titre</span>
            <span>Description</span>
        </li>
        { tasks ? (
            tasks.map(task => (
                <li key={task.id}>
                    <Link to={`/task/${task.id}`}>{task.title}</Link>
                    <span className="task-title"> - {task.title}</span>
                    <span className="task-description"> {task.description}</span>
                </li>
            ))
        )
        : (
            <span>Aucune tâche</span>
        )}
      </ul>
      <CreateTaskForm onCreateTask={onCreateTask} />
    </div>
  );
}

export default TaskList;