'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import Navbar from '@/Components/navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  

  const decodeToken = (token: string) => {
    try {
      const decoded = jwt.decode(token); // Decodes without verifying the signature
      return decoded; // This will be the payload (e.g., { id, role, iat, exp })
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      // Store token in localStorage or cookies (you can also use a state management library)
      localStorage.setItem('token', data.token);
      console.log("token",data.token)
      if (data.token) {
        const userData = decodeToken(data.token);
        console.log(userData); // Example: { id: "12345", role: "Admin", iat: 1691234567, exp: 1691238167 }
      }

      // Redirect user after successful login
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };
  const logout = () => {
    
  };

  return (
    <>
    <Navbar userRole={""} isLoggedIn={false} logout={logout} />
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && (
          <div className="mb-4 p-2 text-center text-sm text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
    </>
  );
};

export default Login;
