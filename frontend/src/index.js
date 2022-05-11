import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const nome = "CardioRed";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);

console.log("funcionando");
