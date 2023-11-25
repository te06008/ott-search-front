import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import WebRouter from "./Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<WebRouter />);
