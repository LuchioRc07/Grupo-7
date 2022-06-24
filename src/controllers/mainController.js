const fs = require('fs');
const path = require("path");


const controlador = {
    home: (req, res) => {
        res.render(path.join(__dirname, "../views/home.ejs"))
    },
    login: (req, res) => {
        res.render(path.join(__dirname, "../views/login.ejs"))
    },
    register: (req, res) => {
        res.render(path.join(__dirname, "../views/register.ejs"))
    },
    
    cart: (req, res) => {
        res.render(path.join(__dirname, "../views/cart.ejs"))
    },


};

module.exports = controlador;