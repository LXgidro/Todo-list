import { useState, useEffect } from 'react';
import TodoAppBase from '../components/TodoAppBase';
import { jsonServerService } from '../services/jsonServerService';

const JsonServerPage = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isServerOnline, setIsServerOnline] = useState(true);

  useEffect(() => {
    checkServerStatus();
    loadTodos();
  }, []);

  const checkServerStatus = async () => {
    const isOnline = await jsonServerService.checkServerConnection();
    setIsServerOnline(isOnline);

    if (!isOnline) {
      setError('JSON Server не запущен. Запустите командой: npm run server');
    }
  };

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await jsonServerService.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load todos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (text) => {
    try {
      const newTodo = await jsonServerService.createTodo({
        title: text,
        completed: false,
        userId: 1,
      });

      setTodos([...todos, newTodo]);
      return newTodo;
    } catch (error) {
      console.error('Failed to add todo:', error);
      alert('Ошибка при добавлении дела');
      throw error;
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      const updatedTodo = await jsonServerService.patchTodo(id, updatedData);

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        )
      );

      return updatedTodo;
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Ошибка при обновлении дела');
      throw error;
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await jsonServerService.deleteTodo(id);

      setTodos(todos.filter((todo) => todo.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Ошибка при удалении дела');
      throw error;
    }
  };

  const handleToggleComplete = async (id, completed) => {
    return handleUpdateTodo(id, { completed: !completed });
  };

  const handleRetry = () => {
    checkServerStatus();
    loadTodos();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🔄 JSON Server </h2>
        <p>Локальный REST API с полным CRUD функционалом</p>

        {!isServerOnline && (
          <div className="server-warning">
            ⚠️ Сервер не запущен. Запустите в отдельном терминале:
            <code>npm run server</code>
          </div>
        )}

        {isServerOnline && (
          <div className="server-status online">
            ✅ Сервер запущен и работает
          </div>
        )}
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

export default JsonServerPage;
