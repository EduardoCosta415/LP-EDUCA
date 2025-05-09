import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Router } from "wouter"; // <- substitui o BrowserRouter
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);