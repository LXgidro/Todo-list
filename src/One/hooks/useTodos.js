import { useState, useEffect } from 'react';
import { todoService } from '../services/firebaseService';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const unsubscribe = todoService.subscribeToTodos(
      (todosData) => {
        setTodos(todosData);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
        console.error('Error in todo subscription:', err);
      }
    );

    return unsubscribe;
  }, []);

  return { todos, isLoading, error };
};
