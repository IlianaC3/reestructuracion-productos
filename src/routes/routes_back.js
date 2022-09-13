const express = require('express');
const { Router } = express;
const router = new Router();
const ProductosClass = require('../controllers/Productos');
const Productos = new ProductosClass();

router.get('/', Productos.AllProductos);

router.get('/:id', Productos.UnProducto);

router.post('/', Productos.SaveProducto);

router.put('/:id', Productos.updateProducto);

router.delete('/:id', Productos.DeleteProducto);

module.exports = router;
