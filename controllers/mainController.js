const express = require("express");
const path = require("path");
const ejs = require("ejs");

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
        res.render(path.join(__dirname, "../views/productCart.ejs"))
    },
    detail: (req, res) => {
        res.render(path.join(__dirname, "../views/productDetail.ejs"))
    }

};

module.exports = controlador;