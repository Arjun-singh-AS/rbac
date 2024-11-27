'use client';

import React, { useState } from "react";

// Component for adding and displaying messages
const AddMessage = () => {
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [showAddMessage, setShowAddMessage] = useState(true); // State to toggle between form and messages
  const [allMessages, setAllMessages] = useState<any[]>([]); // State for storing all messages

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
      setShowAddMessage(false); // Hide form after submitting
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleShowMessages = async () => {
    try {
      const response = await fetch("/api/message"); // Assuming this is the correct API endpoint to fetch all messages
      if (!response.ok) {
        throw new Error("Failed to fetch messages.");
      }
      const data = await response.json();
      setAllMessages(data); // Assuming the data is an array of message objects
    } catch (err: any) {
      setError(err.message);
    }
    setShowAddMessage(false); // Hide form
  };

  return (
    <div className="p-10 bg-gray-200 rounded-lg shadow-lg mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {showAddMessage ? "Add a New Message" : "All Messages"}
      </h1>

      <div className="text-center mb-6">
        <button
          className={`mr-4 px-6 py-2 rounded-lg font-semibold ${showAddMessage ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white'}`}
          onClick={() => setShowAddMessage(true)}
        >
          Add Message
        </button>

        <button
          className={`px-6 py-2 rounded-lg font-semibold ${!showAddMessage ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white'}`}
          onClick={handleShowMessages}
        >
          Show All Messages
        </button>
      </div>

      {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
      {responseMessage && <p className="text-green-500 mb-6 text-center">{responseMessage}</p>}

      {showAddMessage ? (
        <div>
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
      ) : (
        <div>
          {allMessages.length > 0 ? (
            <ul className="space-y-4">
              {allMessages.map((msg, index) => (
                <li key={msg._id} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="font-semibold">{msg.content}</p> {/* Render the content */}
                  <p className="text-gray-500 text-sm">Created at: {new Date(msg.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No messages available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddMessage;
