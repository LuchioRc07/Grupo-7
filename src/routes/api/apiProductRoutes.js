const express           = require('express');
const router            = express.Router()
const productController = require('../.././controllers/api/productController');

router.get('/product', productController.list);
router.get('/product/:id', productController.detail);
router.get('/product/last', productController.lastProduct);

module.exports = router;