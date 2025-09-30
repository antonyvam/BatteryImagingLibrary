import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import AppContextProvider from "./interfaces/context";
import App from "./App";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    // <BrowserRouter>
    <BrowserRouter basename="/">
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </BrowserRouter>
);
