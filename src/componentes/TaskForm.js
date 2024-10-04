import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask({ title, description, completed: false });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="container">
      <h1>Adicionar Tarefa</h1>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="button-container">
          <button type="submit">Adicionar Tarefa</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
