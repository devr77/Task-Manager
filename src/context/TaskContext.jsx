import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = useCallback(
    (text, state) => {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          text,
          completed: false,
          status: "todo",
          priority: state,
        },
      ]);
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: !task.completed,
                status: !task.completed ? "completed" : "todo",
              }
            : task
        )
      );
    },
    [setTasks]
  );

  const Completed = useCallback(() => {
    // setTasks((prev) => [
    //   ...prev,
    //   {
    //     completed: false,
    //   },
    // ]);
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        completed: true,
      }))
    );
  }, [setTasks]);

  const moveTask = useCallback(
    (id, newStatus) => {
      console.log("Moving task", id, "to", newStatus);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    },
    [setTasks]
  );

  const value = useMemo(
    () => ({ tasks, addTask, deleteTask, toggleTask, moveTask, Completed }),
    [tasks, addTask, deleteTask, toggleTask, moveTask, Completed]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
