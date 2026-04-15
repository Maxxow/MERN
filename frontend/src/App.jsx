import React from 'react';
import GenerarPDF from './components/GenerarPDF';

function App() {
    // Datos de ejemplo (pueden venir de una API, estado, etc.)
    const listaProductos = [
        { nombre: 'Laptop', precio: 999.99 },
        { nombre: 'Mouse', precio: 25.50 },
        { nombre: 'Teclado', precio: 45.00 }
    ];

    return (
        <div style={{ padding: '40px' }}>
            <h1>Reporte de Productos</h1>
            <GenerarPDF productos={listaProductos} />
        </div>
    );
}

export default App;