import React from "react";
import NavBar from "./components/NavBar";
import HelloWorld from "./components/HelloWorld";
import AccordionTest from "./components/Accordion";

import "./assets/scss/App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
    <div className={`w-full h-full`}>
        <NavBar />
        <HelloWorld />
        <AccordionTest />
    </div>
    );
};

export default App;
