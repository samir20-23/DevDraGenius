'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [token, setToken] = useState('');
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('/api/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(res.data);
  };

  const handleAdd = async () => {
    await axios.post(
      '/api/todos',
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle('');
    fetchTodos();
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchTodos();
    }
  }, []);

  return (
    <main className="p-4">
      {!token ? (
        <AuthForm setToken={setToken} />
      ) : (
        <>
          <h1 className="text-xl mb-2">Your Todo List</h1>
          <input
            className="border p-1 mr-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-2 py-1">
            Add
          </button>
          <ul className="mt-4">
            {todos.map((todo: any) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

function AuthForm({ setToken }: { setToken: (t: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await axios.post('/api/login', { email, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    setToken(token);
  };

  return (
    <div>
      <h2>Login</h2>
      <input className="border p-1 block mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-1 block mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="bg-green-500 text-white px-2 py-1">Login</button>
    </div>
  );
}
