const API_BASE_URL = 'http://localhost:3001';

export const jsonServerService = {
  getTodos: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching todos from JSON Server:', error);

      if (
        error.message.includes('Failed to fetch') ||
        error.message.includes('NetworkError')
      ) {
        throw new Error(
          'JSON Server не запущен. Запустите командой: npm run server'
        );
      }

      throw error;
    }
  },

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

  createTodo: async (todoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todoData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  updateTodo: async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedData,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  patchTodo: async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedData,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error patching todo:', error);
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true, id };
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },

  searchTodos: async (searchTerm) => {
    try {
      if (!searchTerm.trim()) {
        return await jsonServerService.getTodos();
      }

      const response = await fetch(
        `${API_BASE_URL}/todos?title_like=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching todos:', error);
      console.log('Using client-side search as fallback');
      const allTodos = await jsonServerService.getTodos();
      return allTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  },

  filterByStatus: async (completed) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/todos?completed=${completed}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error filtering by status:', error);
      throw error;
    }
  },

  sortTodos: async (field = 'createdAt', order = 'desc') => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/todos?_sort=${field}&_order=${order}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sorting todos:', error);
      throw error;
    }
  },

  checkServerConnection: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'HEAD',
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
};
