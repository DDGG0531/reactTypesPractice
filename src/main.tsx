import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 目標 把react 文件內的ts語法都try一遍
// 至少要包含
// ref
// button Click
// Component props
// ContextApi
// useState
// useEffect

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
