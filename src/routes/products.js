// ************ Require's ************
const express = require('express')
const router = express.Router()
const path=require('path')


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); // http://localhost:3011/products/ 

/*** GET ONE PRODUCT ***/  // --> asume que la url base es: http://localhost:3010/products/ porque estoy en la ruta "products.js"
router.get('/detail/:id', productsController.detail); 
//router.get('/products/:id', productsController.detail); //esta linea es para entrar desde: http://localhost:3030/products/products/1 , no deberiamos entrar desde ahi, por eso esta comentada.

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id/edit', productsController.update); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);  // http://localhost:3011/products/create
router.post('/create', productsController.store); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id/delete', productsController.destroy); 


module.exports = router;
