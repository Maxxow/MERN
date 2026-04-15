require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/miBaseDatos';

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error("Error conectando a MongoDB:", err));

// Rutas
const rutasProductos = require('./routes/productos');
app.use('/api/productos', rutasProductos);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send("Servidor funcionando");
});

// Puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});