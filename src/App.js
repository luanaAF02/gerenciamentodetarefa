import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import TaskForm from './componentes/TaskForm';
import TaskList from './componentes/TaskList';
import CompletedTasks from './componentes/CompletedTasks';
import './App.css'; 

const API_URL = 'http://localhost:5000/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas do JSON Server ao iniciar
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post(API_URL, { ...task, id: Date.now().toString(), completed: false });
      setTasks(prevTasks => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const toggleComplete = async (id) => {
    const taskToToggle = tasks.find(task => task.id === id);
    if (!taskToToggle) return; // Verifique se a tarefa existe

    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
    try {
      await axios.put(`${API_URL}/${id}`, updatedTask);
      setTasks(prevTasks => prevTasks.map(task => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  const editTask = async (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (!taskToEdit) return;

    const newTitle = prompt('Novo Título:', taskToEdit.title);
    const newDescription = prompt('Nova Descrição:', taskToEdit.description);

    if (newTitle && newDescription) {
      const updatedTask = { ...taskToEdit, title: newTitle, description: newDescription };
      try {
        await axios.put(`${API_URL}/${id}`, updatedTask);
        setTasks(prevTasks => prevTasks.map(task => (task.id === id ? updatedTask : task)));
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  return (
    <Router>
      <div>
        <h1>Lista de Tarefas</h1>
        <TaskForm addTask={addTask} />
        <nav>
          <Link to="/" className="button-link">Tarefas Pendentes</Link> | 
          <Link to="/completed" className="button-link">Tarefas Concluídas</Link>
        </nav>
        <Routes>
          <Route 
            path="/" 
            element={
              <TaskList 
                tasks={tasks.filter(task => !task.completed)} 
                toggleComplete={toggleComplete} 
                editTask={editTask} 
                deleteTask={deleteTask} 
              />
            } 
          />
          <Route 
            path="/completed"   
            element={
              <CompletedTasks 
                tasks={tasks.filter(task => task.completed)} 
                toggleComplete={toggleComplete} 
                editTask={editTask} 
                deleteTask={deleteTask} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
