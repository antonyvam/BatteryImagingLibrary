import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppContextProvider from "./interfaces/context";
import App from "./App";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <BrowserRouter basename="/secret">
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </BrowserRouter>
);
