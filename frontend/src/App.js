import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Medicos from "./pages/Medicos";
import Pacientes from "./pages/Pacientes";
import Consultas from "./pages/Consultas";
import Laudos from "./pages/Laudos";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/medicos" element={<Medicos />} />
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/consultas" element={<Consultas />} />
                <Route path="/laudos" element={<Laudos/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
