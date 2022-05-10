import React from 'react';
import { createRoot } from 'react-dom/client';

const nome = 'CardioRed'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <div>Nome: {nome}</div>
)


console.log("funcionando")