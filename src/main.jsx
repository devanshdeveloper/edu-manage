import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "./provider.jsx";
import "./styles/globals.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { routes } from "./routes/index.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
      <AppRoutes routes={routes} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);