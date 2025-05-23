import React from "react";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`flex justify-between items-center p-2 border rounded transition-all duration-300 ease-in-out transform hover:scale-[1.02]
    ${
      task.completed
        ? "bg-green-100 dark:bg-green-800 line-through text-gray-500 dark:text-gray-400"
        : "bg-white dark:bg-gray-800 text-black dark:text-white"
    }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="mr-2 accent-green-500 w-5 h-5"
      />
      <span className="flex-1 cursor-pointer" onClick={onToggle}>
        {task.text}
      </span>
      <button
        onClick={onDelete}
        className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
      >
        Delete
      </button>
    </div>
  );
};

export default React.memo(TaskItem);
