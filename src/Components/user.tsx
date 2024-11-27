"use client";

import React, { useEffect, useState } from "react";

interface Message {
  _id: string;
  content: string;
  createdAt: string;
}

const DisplayMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/message");
        if (!response.ok) {
          throw new Error("Failed to fetch messages.");
        }
        const data = await response.json();
        setMessages(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-200 rounded-lg shadow-lg w-full max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Messages</h1>
      {messages.length === 0 ? (
        <p className="text-center text-gray-600">No messages available.</p>
      ) : (
        <ul className="space-y-6">
          {messages.map((message) => (
            <li
              key={message._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-lg text-gray-800">{message.content}</p>
              <p className="text-sm text-gray-500 mt-4">
                Posted on: {new Date(message.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayMessages;
