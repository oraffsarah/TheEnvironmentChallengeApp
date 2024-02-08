import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// Bootstrp CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrp Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
