const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// CREATE
router.post('/', async (req, res) => {
    try {
        const nuevo = new Producto(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        const datos = await Producto.find();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );
        if (!actualizado) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ mensaje: "Eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;