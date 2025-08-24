import { useState, useEffect } from 'react';
import TodoAppBase from '../components/TodoAppBase';
import { jsonPlaceholderService } from '../services/jsonPlaceholderService';

const JsonPlaceholderPage = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await jsonPlaceholderService.getTodos();
      setTodos(data.slice(0, 15));
    } catch (err) {
      setError(err.message);
      console.error('Failed to load todos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (text) => {
    try {
      const newTodo = await jsonPlaceholderService.createTodo({
        title: text,
        completed: false,
        userId: 1,
      });

      setTodos([newTodo, ...todos]);
      return newTodo;
    } catch (error) {
      console.error('Failed to add todo:', error);
      alert('Ошибка при добавлении дела (демо-режим)');
      throw error;
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      const updatedTodo = await jsonPlaceholderService.updateTodo(
        id,
        updatedData
      );

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        )
      );

      return updatedTodo;
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Ошибка при обновлении дела (демо-режим)');
      throw error;
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await jsonPlaceholderService.deleteTodo(id);

      setTodos(todos.filter((todo) => todo.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Ошибка при удалении дела (демо-режим)');
      throw error;
    }
  };

  const handleToggleComplete = async (id, completed) => {
    return handleUpdateTodo(id, { completed: !completed });
  };

  const handleRetry = () => {
    loadTodos();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🌐 JSON Placeholder</h2>
        <p>Внешний REST API - изменения только на время сессии</p>
      </div>

      <TodoAppBase
        todos={todos}
        isLoading={isLoading}
        error={error}
        onAddTodo={handleAddTodo}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
        onToggleComplete={handleToggleComplete}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default JsonPlaceholderPage;
