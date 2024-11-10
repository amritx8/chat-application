// libraires
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// components
import { App } from "./App";

// css
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
