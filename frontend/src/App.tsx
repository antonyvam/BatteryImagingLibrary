import React from "react";
import Hero from "./components/HeroFold";
import InfoFold from "./components/InfoFold";
import DataFold from "./components/DataFold";

import "./assets/scss/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
    return (
        <div className="app">
            <Hero />
            <InfoFold />
            <DataFold />
        </div>
    );
};

export default App;
