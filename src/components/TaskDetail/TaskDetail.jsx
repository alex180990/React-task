import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";

import TaskService from "/src/service/TaskService";
// Importez le composant EditTaskForm avec le chemin correct
import EditTaskFrom from "../Forms/EditTaskFrom";

function TaskDetail() {
  const { id } = useParams();
  const taskService = new TaskService();

  const { data: task, isLoading, error } = useQuery(["task", id], async () => {
    return await taskService.getOneTask(id);
  });

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Une erreur est survenue : {error.message}</p>;
  }

  return (
    <div>
      <Link to="/">Retour au tableau de bord</Link>
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
      {/* Rendre le composant EditTaskForm avec les props nécessaires */}
      <EditTaskFrom task={task} />
    </div>
  );
}

export default TaskDetail;