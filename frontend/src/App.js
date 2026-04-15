import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:5000/api/productos';

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const res = await axios.get(API_URL);
            setProductos(res.data);
            setError(null);
        } catch (err) {
            setError('Error al conectar con el servidor.');
            console.error(err);
        }
    };

    const guardarProducto = async () => {
        if (!nombre || !precio) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            if (editandoId) {
                await axios.put(`${API_URL}/${editandoId}`, { nombre, precio });
                setEditandoId(null);
            } else {
                await axios.post(API_URL, { nombre, precio });
            }
            setNombre('');
            setPrecio('');
            obtenerProductos();
            setError(null);
        } catch (err) {
            setError('Error al guardar el producto.');
            console.error(err);
        }
    };

    const eliminarProducto = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                obtenerProductos();
            } catch (err) {
                setError('Error al eliminar.');
            }
        }
    };

    const cargarEdicion = (prod) => {
        setNombre(prod.nombre);
        setPrecio(prod.precio);
        setEditandoId(prod._id);
    };

    const cancelarEdicion = () => {
        setNombre('');
        setPrecio('');
        setEditandoId(null);
    };

    const generarPDF = () => {
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(22);
        doc.text('Reporte de Productos', 20, 20);
        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 30);
        
        // Table content
        let y = 50;
        doc.setFont('helvetica', 'bold');
        doc.text('Nombre', 20, y);
        doc.text('Precio', 120, y);
        doc.line(20, y + 2, 190, y + 2);
        
        y += 10;
        doc.setFont('helvetica', 'normal');
        productos.forEach(p => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            doc.text(p.nombre, 20, y);
            doc.text(`$${p.precio}`, 120, y);
            y += 10;
        });

        doc.save('reporte_productos.pdf');
    };

    return (
        <div className="container">
            <div className="glass-card">
                <h1>Gestión de Productos</h1>
                
                {error && <div className="error-msg">{error}</div>}

                <div className="form-group">
                    <input 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} 
                        placeholder="Nombre del producto"
                    />
                    <input 
                        type="number"
                        value={precio}
                        onChange={e => setPrecio(e.target.value)} 
                        placeholder="Precio"
                    />
                    <button className="btn-primary" onClick={guardarProducto}>
                        {editandoId ? 'Actualizar' : 'Agregar'}
                    </button>
                    {editandoId && (
                        <button className="btn-secondary" onClick={cancelarEdicion}>
                            Cancelar
                        </button>
                    )}
                </div>

                <div className="list-section">
                    <ul className="product-list">
                        {productos.map(p => (
                            <li key={p._id} className="product-item">
                                <div className="product-info">
                                    <h3>{p.nombre}</h3>
                                    <p>${p.precio}</p>
                                </div>
                                <div className="actions">
                                    <button className="btn-edit" onClick={() => cargarEdicion(p)}>
                                        Editar
                                    </button>
                                    <button className="btn-delete" onClick={() => eliminarProducto(p._id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {productos.length > 0 && (
                    <button className="btn-pdf" onClick={generarPDF}>
                        Generar Reporte PDF
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;