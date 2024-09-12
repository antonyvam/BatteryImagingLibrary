import React from "react";
import Hero from "./components/Hero";

import "./assets/scss/App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
    <div>
        <Hero />
    </div>
    );
};

export default App;
