import React from 'react';
import TodoAppBase from '../components/TodoAppBase';
import { useTodos } from '../hooks/useTodos';
import { todoService } from '../services/firebaseService';

const FirebasePage = () => {
  const { todos, isLoading, error } = useTodos();

  const handleAddTodo = async (text) => {
    await todoService.addTodo({
      title: text,
      completed: false,
      userId: 1,
    });
  };

  const handleUpdateTodo = async (id, updatedData) => {
    await todoService.updateTodo(id, updatedData);
  };

  const handleDeleteTodo = async (id) => {
    await todoService.deleteTodo(id);
  };

  const handleToggleComplete = async (id, completed) => {
    await todoService.toggleTodo(id, completed);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🔥 Firebase</h2>
        <p>Real-time база данных</p>
      </div>

      <TodoAppBase
        todos={todos}
        isLoading={isLoading}
        error={error}
        onAddTodo={handleAddTodo}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default FirebasePage;
