import React from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion, AnimatePresence } from "framer-motion";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "progress", title: "Progress" },
  { id: "completed", title: "Completed" },
];

const TaskList = ({ filter = "all" }) => {
  const { tasks, toggleTask, deleteTask, moveTask } = useTasks();

  // Filter
  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  } else if (filter === "todo" || filter === "progress") {
    filteredTasks = tasks.filter((t) => !t.completed && t.status === filter);
  }

  // Group filtered
  const tasksByStatus = {
    todo: filteredTasks.filter((t) => t.status === "todo"),
    progress: filteredTasks.filter((t) => t.status === "progress"),
    completed: filteredTasks.filter((t) => t.status === "completed"),
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      moveTask(Number(draggableId), destination.droppableId);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4 sm:flex-row">
        {columns.map((col) => (
          <Droppable droppableId={col.id} key={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow min-h-[200px] border min-w-[220px]"
              >
                <h2 className="font-bold mb-2">{col.title}</h2>
                <AnimatePresence initial={false}>
                  {tasksByStatus[col.id].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2 bg-white dark:bg-gray-700 p-2 rounded shadow cursor-move"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <TaskItem
                            task={task}
                            onToggle={() => toggleTask(task.id)}
                            onDelete={() => deleteTask(task.id)}
                          />
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default React.memo(TaskList);
