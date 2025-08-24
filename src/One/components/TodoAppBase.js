import React, { useState, useMemo } from 'react';
import TodoList from './TodoList';
import { useDebounce } from '../hooks/useDebounce';
import './TodoAppBase.css';

const TodoAppBase = ({
  todos,
  isLoading,
  error,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
  onToggleComplete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAlphabetical, setSortAlphabetical] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredTodos = useMemo(() => {
    let result = todos;

    if (debouncedSearchTerm) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (sortAlphabetical) {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [todos, debouncedSearchTerm, sortAlphabetical]);

  const handleAddTodo = async () => {
    if (!newTodoText.trim() || isAdding) return;

    setIsAdding(true);
    try {
      await onAddTodo(newTodoText);
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const toggleSort = () => {
    setSortAlphabetical((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Загружаем список дел...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Произошла ошибка</h2>
      </div>
    );
  }

  return (
    <div className="todo-app-base">
      <div className="control-panel">
        <div className="add-todo-section">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Введите новое дело..."
            className="todo-input"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            disabled={isAdding}
          />
          <button
            onClick={handleAddTodo}
            className="add-button"
            disabled={isAdding}
          >
            {isAdding ? 'Добавление...' : 'Добавить'}
          </button>
        </div>

        <div className="search-sort-section">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Поиск дел..."
              className="search-input"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="clear-search-button"
                title="Очистить поиск"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={toggleSort}
            className={`sort-button ${sortAlphabetical ? 'active' : ''}`}
          >
            {sortAlphabetical ? 'Сортировка: Вкл' : 'Сортировка: Выкл'}
          </button>
        </div>
      </div>

      <div className="stats">
        Всего: {todos.length} {searchTerm && ` | Поиск: "${searchTerm}"`}
        {sortAlphabetical && ' | Сортировка по алфавиту'}
      </div>

      <TodoList
        todos={filteredTodos}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
        onToggleComplete={onToggleComplete}
        isEmptySearch={searchTerm && filteredTodos.length === 0}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default TodoAppBase;
