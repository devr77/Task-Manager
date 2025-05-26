import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskForm = () => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("");
  const { addTask } = useTasks();
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      // addTask(text.trim());
      addTask(text.trim(), priority);
      setText("");
    }

    // if (text.trim() && text.length == 6 && text.length <= 10) {
    //   addTask(text.trim(), priority);
    //   setText("");
    // } else {
    //   setError("Check the Word Length");
    //   setText("");
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center my-4"
    >
      <div> {error}</div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task"
        className="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value="Select Priority"
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Select Value">Select Value</option>
        <option value="high">High </option>
        <option value="low">Low</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all disabled:opacity-50"
        disabled={!text.trim()}
      >
        Add
      </button>
    </form>
  );
};

export default React.memo(TaskForm);
