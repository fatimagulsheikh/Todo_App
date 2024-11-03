"use client";
import { useState } from "react";

export default function Home() {
  // Define state
  const [todos, setTodos] = useState<{ novel: string; id: number }[]>([
    { novel: "Peer E Kamil", id: 1 },
    { novel: "Aab E Hayat", id: 2 },
  ]);

  const [inputVal, setInput] = useState("");

  // Functions
  const addItem = () => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    const existingItem = todos.find(item => item.novel === inputVal);
    if (existingItem) {
      // Edit the existing item
      const newArray = todos.filter(item => item.id !== existingItem.id);
      setTodos([...newArray, { novel: inputVal, id: existingItem.id }]);
    } else {
      // Add new item with auto-generated ID
      setTodos([...todos, { novel: inputVal, id: newId }]);
    }

    setInput("");
  };

  const editItem = (id: number) => {
    const itemToEdit = todos.find(item => item.id === id);
    if (itemToEdit) {
      setInput(itemToEdit.novel);
    }
  };

  const delItem = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen flex flex-col items-center p-8">
      <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-md mb-8">
        🌟 Todo App
      </h1>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-xl mb-10 p-6 bg-white rounded-lg shadow-xl">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInput(e.target.value)}
          className="w-full sm:w-2/3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Write novel name..."
        />
        <button
          onClick={addItem}
          className="w-full sm:w-1/3 p-3 mt-2 sm:mt-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
        >
          ➕ Add Novel
        </button>
      </div>

      {/* Novels List */}
      <h2 className="text-4xl font-bold text-gray-700 mb-6">Novels List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {todos.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="bg-purple-100 text-purple-700 font-bold rounded-full h-10 w-10 flex items-center justify-center">
                {item.id}
              </span>
              <button
                onClick={() => delItem(item.id)}
                className="text-red-500 font-bold text-xl hover:text-red-600"
              >
                ✖️
              </button>
            </div>
            <div className="mt-4 text-2xl text-gray-800 font-semibold">
              {item.novel}
            </div>
            <button
              onClick={() => editItem(item.id)}
              className="self-end text-purple-500 font-medium mt-3 hover:underline"
            >
              ✏️ Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
