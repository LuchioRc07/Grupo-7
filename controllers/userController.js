let fs = require("fs");
const express = require("express");
const path = require("path");
const ejs = require("ejs");

let archivoJSON = fs. readFileSync("./data/usuarios.json", {encoding: "utf-8"});

const userController = {
    register: (req, res) => {
        res.render("register");
    },
    login: (req, res) => {
        res.render("login");
    },
    list: (req, res) => {
    

    let users = JSON.parse(archivoJSON);

    res.render("userList", {"users": users } );
    },
   search: (req, res) => {

        let loQueBuscoElUsuario = req.query.search;

        

        let users = JSON.parse(archivoJSON);

        let usersResults = [];
        for(let i = 0; i < users.lenght; i++) {
        if (user[i].name.includes(loQueBuscoElUsuario)){
        userResults.push( users [ i ] );   
    }    
 }
        res.render(" userResults ", { userResults :  userResults});
    },
    create: (req, res) => {
           let usuario = {
            id: archivoJSON[archivoJSON.length - 1].id + 1,

               nombre: req.body.user, 
            //    edad: req.body.edad,
               email: req.body.email,
               pass: req.body.pass,
               pass_confirm: req.body.pass_confirm,
               avatar: req.body.avatar
           }
           res.send(usuario)
        //    archivoJSON.push(usuario)
       },
       actualizar: (req, res) => {
        let idUser = req.params.idUser;
    

        let users = JSON.parse(archivoJSON);
    
        let userToEdit = users[idUser];
        
        res.render("userEdit", {userToEdit: userToEdit });
        
        res.send(idUser);
    },
    edit: (req, res) => {
		let nuevoProducto = {
			id: products[products.length - 1].id + 1, //Para no soreescribir productos
			...req.body,
			image: req.file ? req.file.filename : 'default-image.png' // un if ternario , evaluamos si existe req.file en lo que recibimos
																	 //que nos guarde el filename del archivo , de lo contrario tenemos una imagen por defecto en nuestra 'base de datos'
		}
		//res.send(nuevoProducto)
		products.push(nuevoProducto)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
		res.redirect("/")

	}

}

module.exports = userController;