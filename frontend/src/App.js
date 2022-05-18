import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Medicos from "./pages/Medicos";
import Pacientes from "./pages/Pacientes";

function App() {
    let tokens = {};
    const setTokens = (data) => {
        tokens = data;
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setTokens={setTokens} />} />
                <Route path="/home" element={<Home setTokens={setTokens} />} />
                <Route
                    path="/medicos"
                    element={<Medicos setTokens={setTokens} />}
                />
                <Route
                    path="/pacientes"
                    element={<Pacientes setTokens={setTokens} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
