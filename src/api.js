const API_BASE_URL = 'http://localhost:3001';

export const todoAPI = {
  getAllTodos: () => {
    return fetch(`${API_BASE_URL}/todos`).then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    });
  },

  createTodo: (todo) => {
    return fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    });
  },

  updateTodo: (id, updatedData) => {
    return fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    }).then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    });
  },

  patchTodo: (id, updatedData) => {
    return fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    }).then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    });
  },

  deleteTodo: (id) => {
    return fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    });
  },
};
