"use client";

import React, { useState } from "react";

const AddMessage = () => {
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddMessage = async () => {
    const token = localStorage.getItem("token"); // Ensure the user has a token

    if (!token) {
      setError("You must be logged in as a developer.");
      return;
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, content: message }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setResponseMessage(data.message);
      setMessage("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-10 bg-gray-200 rounded-lg shadow-lg mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Message</h1>
      {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
      {responseMessage && <p className="text-green-500 mb-6 text-center">{responseMessage}</p>}
      <textarea
        className="w-full h-40 p-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        onClick={handleAddMessage}
      >
        Submit Message
      </button>
    </div>
  );
};

export default AddMessage;
