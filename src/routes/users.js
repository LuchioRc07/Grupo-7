const express = require('express');
const router = express.Router();
const path = require("path");
const ejs = require("ejs");
const userController = require("../controllers/userController");
//const router = require("./main");

router.get("/", (req, res, next) => {
    res.send("respond with a resource");
});

router.get("/register", userController.register);
router.post("/register", userController.create);
router.get("/login", userController.login);
router.get("/list", userController.list);
router.get("/search",userController.search);
// router.get("/edit/:idUser", userController.edit); 
router.put("/actualizar/:id", userController.actualizar); 


// -- CARRITO -- //
router.get('/cart', userController.cart); //metodo post - muestra el carrito

router.post('/addToCart/:id', userController.addToCart); //recibe como parametro el ID del producto a agregar

router.post('/deleteFromCart/:id', userController.deleteFromCart); //recibe como parametro el ID del producto a eliminar



module.exports = router;