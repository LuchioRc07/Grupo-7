let fs = require("fs");
const path = require("path");
let archivoJSON = fs. readFileSync("./src/data/usuarios.json", {encoding: "utf-8"});
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const cartFilePath = path.join(__dirname, '../data/productCart.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let carrito = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
const bcryptjs = require('bcryptjs');


const {
	validationResult
} = require('express-validator');

const User = require('../models/users');

const controller = {
	register: (req, res) => {
		return res.render('register');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/login');
	},
	login: (req, res) => {
		return res.render('login');
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
	profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = controller;

// const userController = {
//     register: (req, res) => {
//         res.render("register");
//     },
//     login: (req, res) => {
//         res.render("login");
//     },
//     list: (req, res) => {
    

//     let users = JSON.parse(archivoJSON);

//     res.render("userList", {"users": users } );
//     },
//     search: (req, res) => {

//         let loQueBuscoElUsuario = req.query.search;

        

//         let users = JSON.parse(archivoJSON);

//         let usersResults = [];
//         for(let i = 0; i < users.lenght; i++) {
//         if (user[i].name.includes(loQueBuscoElUsuario)){
//         userResults.push( users [ i ] );   
//         }    
//     }
//         res.render(" userResults ", { userResults :  userResults});
//     },
//     create: (req, res) => {
//            let usuario = {
//             id: archivoJSON[archivoJSON.length - 1].id + 1,

//                nombre: req.body.user, 
//             //    edad: req.body.edad,
//                email: req.body.email,
//                pass: req.body.pass,
//                pass_confirm: req.body.pass_confirm,
//                avatar: req.body.avatar
//            }
//            res.send(usuario)
//         //    archivoJSON.push(usuario)
//        },
//        actualizar: (req, res) => {
//         let idUser = req.params.idUser;
    

//         let users = JSON.parse(archivoJSON);
    
//         let userToEdit = users[idUser];
        
//         res.render("userEdit", {userToEdit: userToEdit });
        
//         res.send(idUser);
//     },
//     edit: (req, res) => {
// 		let nuevoProducto = {
// 			id: products[products.length - 1].id + 1, //Para no soreescribir productos
// 			...req.body,
// 			image: req.file ? req.file.filename : 'default-image.jpg' // un if ternario , evaluamos si existe req.file en lo que recibimos
// 																	 //que nos guarde el filename del archivo , de lo contrario tenemos una imagen por defecto en nuestra 'base de datos'
// 		}
// 		//res.send(nuevoProducto)
// 		products.push(nuevoProducto)
// 		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
// 		res.redirect("/")

// 	},

//   ///////////// inicio carrito ///////////////////
//   // son 4 funciones: 
//   // cart --> mostrar el carrito
//   // addToCart --> agregar item al carrito
//   // deleteFromCart --> eliminar producto del carrito --  es un post en /users/deleteFromCart
//   // shop --> comprar (se ejecuta al apretar el boton) --falta hacer

//      cart(req, res) { //muestra todos los productos del carrito
//         carrito = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8')); //leo el carrito actualizado. Puedo venir de un Delete o de un Add reciente.
//         res.render ("cart", {carrito}) //renderizo "cart.ejs". Le mando el objeto "carrito" para que pueda trabajar la vista. Va entre corchetes porque es un objeto.
//       },
  
//       addToCart(req, res) { //agrega 1 producto al carrito y muestra el carrito actualizado.
//         carrito = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8')); //leo el carrito actualizado. Puedo venir de un Delete o de un Add reciente.
//         let idProduct = req.params.id; //recibo el ID como parametro de la vista detail.ejs
//         let nuevoProd = products.find(product => product.id == idProduct) //busco en la lista de productos el producto que el usuario quiere agregar por su ID
//         nuevoProd.id = Object.keys(carrito).length
//         carrito.push(nuevoProd) //agrego el producto nuevo al carrito
//         fs.writeFileSync (cartFilePath , JSON.stringify(carrito), {encoding: 'utf-8'}) //grabo el carrito
//         res.redirect("/users/cart") //muestro la vista del carrito actualizado
//       },
  
//       deleteFromCart(req, res) { //borra un producto del carrito y muestra el carrito actualizado. 
//         carrito = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8')); //leo el carrito actualizado. Puedo venir de un Delete o de un Add reciente.
//         carrito.splice(req.params.id, 1) //elimino el producto seleccionado del carrito. Me viene el ID por los parametros y como los tengo coincidentes con la posicion que ocupan, elimino desde la posicion ID (parametro 1 de Splice), 1 solo elemento (parametro 2 de Splice)
//         for(let i = 0 ; i < Object.keys(carrito).length ; i++){       //reordeno los ID de los productos del carrito
//           carrito[i].id = i
//         } 
//         fs.writeFileSync (cartFilePath , JSON.stringify(carrito), {encoding: 'utf-8'}) //grabo el carrito
//         res.redirect("/users/cart") //muestro la vista del carrito actualizado
//       },
  
//       shop(req,res){
  
//       }
    
//     ///////////// fin carrito ///////////////////
  



// module.exports = userController;