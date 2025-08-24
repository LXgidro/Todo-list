import { useState, useCallback } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

  const preventDoubleClick = useCallback(
    (callback) => {
      const now = Date.now();
      if (now - lastClickTime > 500) {
        setLastClickTime(now);
        callback();
      }
    },
    [lastClickTime]
  );

  const handleSave = () => {
    preventDoubleClick(() => {
      if (editText.trim() && editText !== todo.title) {
        setIsUpdating(true);
        onUpdateTodo(todo.id, { title: editText }).finally(() => {
          setIsUpdating(false);
          setIsEditing(false);
        });
      } else {
        setIsEditing(false);
      }
    });
  };

  const handleCancel = () => {
    setEditText(todo.title);
    setIsEditing(false);
  };

  const handleToggle = () => {
    preventDoubleClick(() => {
      setIsUpdating(true);
      onToggleComplete(todo.id, todo.completed).finally(() =>
        setIsUpdating(false)
      );
    });
  };

  const handleDelete = () => {
    preventDoubleClick(() => {
      if (window.confirm('Удалить это дело?')) {
        setIsUpdating(true);
        onDeleteTodo(todo.id).finally(() => setIsUpdating(false));
      }
    });
  };

  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''} ${
        isUpdating ? 'updating' : ''
      }`}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
          disabled={isUpdating}
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            onBlur={handleSave}
            className="edit-input"
            autoFocus
            disabled={isUpdating}
          />
        ) : (
          <span
            className="todo-title"
            onDoubleClick={() => !isUpdating && setIsEditing(true)}
          >
            {todo.title}
            {isUpdating && <span className="updating-spinner"></span>}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="action-button save"
              title="Сохранить"
              disabled={isUpdating}
            >
              {isUpdating ? '⏳' : '✓'}
            </button>
            <button
              onClick={handleCancel}
              className="action-button cancel"
              title="Отменить"
              disabled={isUpdating}
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              className="action-button edit"
              title="Редактировать"
              onClick={() => preventDoubleClick(() => setIsEditing(true))}
              disabled={isUpdating}
            >
              ✏️
            </button>
            <button
              className="action-button delete"
              title="Удалить"
              onClick={handleDelete}
              disabled={isUpdating}
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
