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

// 這邊就很適合上傳sentry
// 因為errorBoundary指會捕捉dom的錯誤，click event未必會造成dom出錯，例如直接噴error
window.addEventListener("error", (event) => {
  // Handle global error  console.error('Global Error:', event.error);
  console.error("Global Error:", event.error);
});
