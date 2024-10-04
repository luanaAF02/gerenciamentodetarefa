import React from 'react';
import TaskList from './TaskList';

const CompletedTasks = ({ tasks, toggleComplete, editTask, deleteTask }) => {
  const completedTasks = tasks.filter(task => task.completed);
  return (
    <div className="container">
      <h1>Tarefas Concluídas</h1>
      <TaskList 
        tasks={completedTasks} 
        toggleComplete={toggleComplete} 
        editTask={editTask} 
        deleteTask={deleteTask} 
      />
    </div>
  );
};

export default CompletedTasks;
