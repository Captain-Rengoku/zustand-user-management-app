import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import "./index.css"
import { Bounce, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={1000}
      newestOnTop={false}
      hideProgressBar={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </StrictMode>
);
