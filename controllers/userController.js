// let fs = require("fs");
// const express = require("express");
// const path = require("path");
// const ejs = require("ejs");

// let archivoJSON = fs. readFileSync("usuarios.json", {encoding: "utf-8"});

// const userController = {
//     register: (req, res) => {
//         res.render("register");
//     },
//     login: (req, res) => {
//         res.render("login");
//     },
//     list: (req, res) => {
//     let archivoJSON = fs. readFileSync("usuarios.json", {encoding: "utf-8"});

//     let users = JSON.parse(archivoJSON);

//     res.render("userList", {"users": users } );
//     },
//    search: (req, res) => {

//         let loQueBuscoElUsuario = req.query.search;

//         let archivoJSON = fs.readFileSync("usuarios.json", {encoding: "utf-8"});

//         let users = JSON.parse(archivoJSON);

//         let usersResults = [];
//         for(let i = 0; i < users.lenght; i++) {
//         if (user[i].name.includes(loQueBuscoElUsuario)){
//         userResults.push( users [ i ] );   
//     }    
//  }
//         res.render(" userResults ", { userResults :  userResults});
//     },
//     create: (req, res) => {
//            let usuario = {
//                nombre: req.body.user, 
//             //    edad: req.body.edad,
//                email: req.body.email
//            }
//            let archivoUsuario = fs.readFileSync("usuarios.json", {encoding: "utf-8"});
//            let usuarios;
//            if(archivoUsuario == "") {
//             usuarios = [];
//            }else{
//             usuarios = JSON.parse(archivoUsuario);
//            }
//            usuarios.push(usuario);

//            usuariosJSON = JSON.stringify(usuarios);

//            fs.writeFileSync("usuarios.json", archivoJSON);

//                     res.redirect("/users/list");
//        },
//     //    actualizar: (req, res) => {
//     //     let idUser = req.params.idUser;
    

//     //     let users = JSON.parse(archivoJSON);
    
//     //     let userToEdir = users[idUser];
        
//     //     res.render("userEdit", {userToEdit: userToEdit });
        
//     //     res.send(idUser);
//     // },
//     // edit: (req, res) => {
//     //     let id = req.params.id;
//     //     let editUser = archivoJSON.find(item => item.id == id)
// 	// 	res.render(userEdit, {archivoJSON});
//     // }

// }

// module.exports = userController;