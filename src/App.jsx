import React, { useState } from "react";

import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import { TaskProvider } from "./context/TaskContext";
import ThemeToggle from "./Components/ThemeToggle";

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <h2>Something went wrong.</h2>;
    return this.props.children;
  }
}

function App() {
  const [filter, setFilter] = useState("all");

  return (
    <ErrorBoundary>
      <TaskProvider>
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <nav className="flex justify-between items-center px-4 py-3 shadow-md bg-gray-100 dark:bg-gray-800">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <ThemeToggle />
          </nav>
          <main className="flex-1  p-4 max-w-2xl mx-auto pb-16">
            <TaskForm />

            <div className="flex gap-2 my-4">
              <button
                onClick={() => setFilter("all")}
                className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
              >
                All
              </button>
              <button
                onClick={() => setFilter("todo")}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Todo
              </button>
              <button
                onClick={() => setFilter("progress")}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Progress
              </button>
              <button
                onClick={() => setFilter("completed")}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Completed
              </button>
            </div>

            <TaskList filter={filter} />
          </main>
        </div>
      </TaskProvider>
    </ErrorBoundary>
  );
}

export default App;
