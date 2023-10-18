import './App.css'

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import TaskService from './service/taskService';

import Dashboard from './components/Dashboard/Dashboard';
import TaskDetail from './components/TaskDetail/TaskDetail';
import EditTaskFrom from "./components/Forms/EditTaskFrom";

function App() {

  const queryClient = new QueryClient();
  const taskService = new TaskService();

  const [tasks, setTask] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try{
        const fetchedTasks = await taskService.getAllTasks();
        console.log(fetchedTasks);
        setTask(fetchedTasks);
      } catch (error){
        console.error('Erreur lors de la récupération des tâches :',error);
      }
    }
    fetchTasks();

  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard tasks={tasks}/>} />
          <Route path='/task/:id' element={<TaskDetail taskService={taskService}/>} />
          <Route path='/task/:id/edit' element={<EditTaskFrom taskService={taskService} tasks={tasks}/>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App