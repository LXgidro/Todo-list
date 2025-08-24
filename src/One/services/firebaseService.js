import { ref, push, update, remove, onValue, off } from 'firebase/database';
import { db } from '../firebase';

export const todoService = {
  subscribeToTodos: (callback) => {
    const todosRef = ref(db, 'todos');

    const unsubscribe = onValue(
      todosRef,
      (snapshot) => {
        const todosData = snapshot.val();
        const todos = todosData
          ? Object.keys(todosData).map((key) => ({
              id: key,
              ...todosData[key],
            }))
          : [];

        callback(todos);
      },
      (error) => {
        console.error('Error subscribing to todos:', error);
        throw error;
      }
    );

    return () => off(todosRef, 'value', unsubscribe);
  },

  addTodo: async (todoData) => {
    try {
      const todosRef = ref(db, 'todos');
      const newTodoRef = push(todosRef);

      const todoWithTimestamps = {
        ...todoData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await update(newTodoRef, todoWithTimestamps);

      return {
        id: newTodoRef.key,
        ...todoWithTimestamps,
      };
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  },

  updateTodo: async (id, updatedData) => {
    try {
      const todoRef = ref(db, `todos/${id}`);
      await update(todoRef, {
        ...updatedData,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      const todoRef = ref(db, `todos/${id}`);
      await remove(todoRef);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },

  toggleTodo: async (id, completed) => {
    try {
      const todoRef = ref(db, `todos/${id}`);
      await update(todoRef, {
        completed: !completed,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw error;
    }
  },
};
