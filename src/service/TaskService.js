import { config } from '../config';

class TaskService {
    
    baseUrl = config.baseUrl;
    taskUrl = `${this.baseUrl}task_getAll.php`;
    taskOneUrl = `${this.baseUrl}task_getOne.php?id=`;
    taskUpdateUrl = `${this.baseUrl}task_update.php?id=`;
    taskCreateUrl = `${this.baseUrl}task_post.php`;

    async getAllTasks() {
        const response = await fetch(this.taskUrl);
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const data = await response.json();
        return data;
    }

    async getOneTask(taskId) {
        try {
            const response = await fetch(`${this.taskOneUrl}${taskId}`);
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            const data = await response.json();
            console.log(data); // Affichez les données pour le débogage
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            throw error; // Propagez l'erreur pour la gérer ailleurs si nécessaire
        }
    }

    async updateTask(taskId, taskData) {
        try {
          const response = await fetch(`${this.taskUpdateUrl}${taskId}`, {            
            method: 'PUT',
            body: JSON.stringify(taskData),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response);
      
          if (!response.ok) {
            throw new Error('La requête a échoué.');
          }
      
          const data = await response.json();
      
          if (data && data.message === "Tache modifiée") {
            // La mise à jour de la tâche a réussi, vous pouvez retourner un indicateur de succès ou d'autres données
            return data;
          } else {
            // La réponse ne contient pas les données attendues
            throw new Error('La mise à jour de la tâche a échoué');
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la tâche :', error);
          throw error; // Propagez l'erreur pour la gérer ailleurs si nécessaire
        }
    }

    async createTask(taskData) {
        try {
            var test = {
                "title": "abc",
                "description": "Pizza et soupe carine !",
                "completed": "false"
        }

        console.log(test);
        console.log(taskData)
            const response = await fetch(`${this.taskCreateUrl}`, {
                // Configurez la requête avec les données de taskData
                method: 'POST', // Spécifiez la méthode POST pour créer une nouvelle tâche
                body: JSON.stringify(test),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            console.log(response);

            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }

            const data = await response.json();

            if (data && data.message === "Tache créée") {
                // La création de la tâche a réussi, vous pouvez retourner un indicateur de succès ou d'autres données
                return data;
            } else {
                // La réponse ne contient pas les données attendues
                throw new Error('La création de la tâche a échoué');
            }
        } catch (error) {
            console.error('Erreur lors de la création de la tâche :', error);
            throw error; // Propagez l'erreur pour la gérer ailleurs si nécessaire
        }
    }
}

export default TaskService;