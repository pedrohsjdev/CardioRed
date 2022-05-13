import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Medicos from "./pages/Medicos";
import Pacientes from "./pages/Pacientes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/medicos" element={<Medicos />} />
                <Route path="/home/pacientes" element={<Pacientes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
