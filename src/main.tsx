import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Store from "../app/page";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Store />
  </StrictMode>,
);
