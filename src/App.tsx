import { useEffect, useState } from 'react';
import './App.css';
import { hc } from 'hono/client';
import type { AppType, TodoResponse } from '../functions/api/[[route]]';

function App() {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  useEffect(() => {
    async function getTodos() {
      const url = import.meta.env.DEV ? 'http://localhost:8788/api' : 'api';
      const client = hc<AppType>(url);
      const res = await client.todos.$get();
      const json = await res.json();
      return json;
    }
    getTodos().then((todos) => {
      console.warn(todos);
      setTodos(todos);
    });
  }, []);

  return (
    <div className='App'>
      {todos.map((todo) => {
        return (
          <p key={todo.id}>
            id: {todo.id} title: {todo.title}
          </p>
        );
      })}
    </div>
  );
}

export default App;
