import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const getInitialMode = () =>
    localStorage.theme ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", mode);
    localStorage.theme = mode;
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleMode}
      className="bg-gray-300 text-sm px-3 py-1 rounded dark:bg-gray-700 transition"
    >
      {mode === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
