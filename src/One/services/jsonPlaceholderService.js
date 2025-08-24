const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const jsonPlaceholderService = {
  // Получить все todos
  getTodos: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching todos from JSON Placeholder:', error);
      throw error;
    }
  },

  // Получить todo по ID (не используется в основном функционале)
  getTodoById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching todo by ID:', error);
      throw error;
    }
  },

  // Создать новый todo (только имитация - не сохраняется на сервере)
  createTodo: async (todoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // JSON Placeholder возвращает фейковые данные с ID 201
      // Добавляем timestamp для уникальности в UI
      return {
        ...data,
        id: Date.now(), // Заменяем ID на уникальный
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Обновить todo (только имитация)
  updateTodo: async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Возвращаем обновленные данные с timestamp
      return {
        ...data,
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  // Удалить todo (только имитация)
  deleteTodo: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },

  // Поиск todos (фильтрация на клиенте, т.к. JSON Placeholder не поддерживает search)
  searchTodos: async (searchTerm) => {
    try {
      // Сначала получаем все todos
      const allTodos = await jsonPlaceholderService.getTodos();

      // Фильтруем на клиенте
      return allTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching todos:', error);
      throw error;
    }
  },
};
