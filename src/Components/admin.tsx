"use client";
import React, { useState, useEffect } from "react";

// Define types for user data
interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  // State for storing user data, loading state, and error message
  const [users, setUsers] = useState<User[]>([]); // Typed as an array of User
  const [loading, setLoading] = useState<boolean>(true); // Typed as boolean
  const [error, setError] = useState<string | null>(null); // Typed as string or null

  // Fetch data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // API endpoint to get users
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: User[] = await response.json(); // Type the response data as an array of User
        setUsers(data); // Set users data
      } catch (err: any) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Data fetching complete
      }
    };

    fetchUsers();
  }, []);

  // Update user role
  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/updaterole`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId:userId, role: newRole }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      // Update role locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err: any) {
      alert(`Error updating role: ${err.message}`);
    }
  };

  // Render the data or loading state
  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl font-semibold text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">User List</h1>

      <div className="overflow-x-auto shadow-lg border border-gray-300 rounded-lg">
        <table className="min-w-full table-auto text-sm text-left text-gray-600">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  {/* Button to change the role */}
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user._id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
