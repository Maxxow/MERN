import React from 'react';
import jsPDF from 'jspdf';

export default function GenerarPDF({ productos = [] }) {
    const generarPDF = () => {
        const doc = new jsPDF();
        
        // Título
        doc.setFontSize(18);
        doc.text("Lista de productos", 10, 15);
        
        // Contenido dinámico
        let y = 25;
        productos.forEach((prod, i) => {
            doc.setFontSize(12);
            doc.text(`${i + 1}. ${prod.nombre} $${prod.precio}`, 10, y);
            y += 10;
        });
        
        // Si no pasas productos, usa texto estático
        if (productos.length === 0) {
            doc.setFontSize(12);
            doc.text("Producto de ejemplo $10.00", 10, 25);
        }
        
        doc.save("productos.pdf");
    };

    return (
        <button 
            onClick={generarPDF} 
            style={{ padding: '12px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
            Descargar PDF
        </button>
    );
}