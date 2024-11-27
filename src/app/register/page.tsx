'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'User', // Default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful!');
        setTimeout(() => router.push('/login'), 1500); // Redirect to login page after success
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
        console.log(err)
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-md rounded-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Register</h1>

        {error && (
          <p className="mb-4 text-sm text-red-500 border border-red-500 p-2 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-4 text-sm text-green-500 border border-green-500 p-2 rounded">
            {success}
          </p>
        )}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Developer">Developer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
