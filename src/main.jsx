import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FormStepProvider } from "./context/FormStepContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FormStepProvider>
        <App />
      </FormStepProvider>
    </BrowserRouter>
  </StrictMode>
);
