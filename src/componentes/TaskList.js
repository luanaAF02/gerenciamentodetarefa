import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleComplete, editTask, deleteTask }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa pendente.</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            toggleComplete={toggleComplete} 
            editTask={editTask} 
            deleteTask={deleteTask} 
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
