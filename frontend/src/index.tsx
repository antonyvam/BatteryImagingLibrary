import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContextProvider from "./interfaces/context";
import App from "./App";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </AppContextProvider>
  </BrowserRouter>
);
