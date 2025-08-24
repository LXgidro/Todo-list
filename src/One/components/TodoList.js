import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo, onToggleComplete }) => {
  if (!todos || todos.length === 0) {
    return <div className="empty-state">Нет задач для отображения</div>;
  }

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h2>Список дел</h2>
      </div>

      <ul className="todo-items">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
