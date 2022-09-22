const fs = require('fs');
const path = require('path');
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const product = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const express = require('express');
const {validationResult} = require('express-validator');

// const controller = {
// 	// Root - Show all products
// 	index: (req, res) => {
// 		res.render ("products", {products, toThousand})
// 	},

// 	// Detail - Detail from one product 
// 	detail: (req, res) => {
// 		let idProduct = req.params.id;
// 		let product = products.find(product => product.id == idProduct)
// 		res.render("productDetail", {product, toThousand})
// 	},

// 	// Create - Form to create   /// falta terminar!!! **************  Hay que poner un boton de Agregar Producto en la lista de productos o en en Header que vaya a http://localhost:3011/products/create 
// 	create: (req, res) => {
// 		res.render("product-create-form")
// 	},
 
// 	// Create -  Method to store   /// falta terminar!!! **************
// 	store: (req, res) => {
// 		console.log("llegue al store!")

// 		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
// 		const idN = products.length

// 		let name        = req.body.name;
// 		let price       = req.body.price;
// 		let discount    = req.body.discount;
// 		let category    = req.body.category;

// 		let product = {
// 			id:idN,
// 			name: name,
// 			price: price,
// 			discount: discount,
// 			category: category,
// 			image: "generica.png" // falta poner la imagen q sube el usuario
// 		}
// 		products.push(product)
// 		//console.log(product)
// 		//guardarlo!
// 		fs.writeFileSync (productsFilePath , JSON.stringify(products), {encoding: 'utf-8'})

// 		res.redirect('/') // redirige a http://localhost:3011/products/
		
// 	},

// 	// Update - Form to edit       /// falta terminar!!! **************
// 	edit: (req, res) => {
// 		// console.log("llegue al edit!")
// 		//let idProduct = req.params.id;
// 		let product = products.find(product => product.id == req.params.id )
// 		// console.log(product)
// 		res.render('product-edit-form', {product} );
// 	},

// 	// Update - Method to update        /// falta terminar!!! **************
// 	update: (req, res) => {

// 		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
// 		const id     = +req.params.id;

// 		let name        = req.body.name;
// 		let price       = req.body.price;
// 		let discount    = req.body.discount;
// 		let category    = req.body.category;
// 		let description = req.body.description;
// 		let product = products.find(product => product.id == req.params.id )


// 		let editProduct = {

// 			id: id,
// 			name: name,
// 			price: price,
// 			discount: discount,
// 			category: category,
// 			description: description,
// 			image: product.image // traemos la imagen original

// 		};	

// 		for( let i in products ) {
// 			if( products[ i ].id === id ) {
// 				products[ i ] = editProduct;
// 				break;
// 			}
// 		}
		
// 		fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );
// 		res.redirect( '/' );

// 	},

// 	// Delete - Delete one product from DB      
// 	destroy : (req, res) => {

// 		let idProduct = req.params.id;
// 		let productAElim = products.find(product => product.id == idProduct)
// 		products.splice(productAElim.id-1, 1) // si le llega id=10, es que hay 11 productos. 
// 		fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );
// 		res.redirect('/products')



// 	}
// };

// module.exports = controller;


// posible controller

// const { products } = require('../data/productsDB');
// const db = require('../database/models');


module.exports = {
    index: (req, res) => {
        db.Producto.findAll({
            // include: [{association: "category"}, {association: "image"}]
        })
        .then((products) => {
            res.render('products', {products, n:false,title:"Productos", session: req.session ? req.session : ""});
        })
        .catch(err => console.log(err))
    },
    // Create - Form to create   /// falta terminar!!! **************  Hay que poner un boton de Agregar Producto en la lista de productos o en en Header que vaya a http://localhost:3011/products/create 
	create: (req, res) => {
		res.render("product-create-form")
	},
    store: (req, res) => {
        		console.log("llegue al store!")
        
        		// 
                let errors = validationResult(req);
        if (errors.isEmpty()) {
            let arrayImages = []
            if(req.files){
                req.files.forEach(Image => {
                    arrayImages.push(image.filename)
                })
            }
            let { name, description, discount, price, category, image} = req.body
            db.Producto.create( {
                name,
                price,
                category,
                description,
                discount,
                image,
                // stock
            })
            .then(product => {
                if(arrayImages.length > 0){
                    let images = arrayImages.map(image => {
                        return {
                            name: image,
                            // product_id: product.id
                        }
                    })
                    db.Image.bulkCreate(images)
                    .then(()=> res.redirect('/products'))
                    .catch(err => console.log(err))                    
                }else {
                    db.Image.create({
                        name: "default-image.png",
                        id_product: product.id
                    })
                    .then(()=> res.redirect('/products')) ///adminProductos Faltaría poner que solo un admin puede agregar productos
                    .catch(err => console.log(err))
                }
               
            })
            .catch(error => {
                res.send(error)
            })
        } else {
            db.Category.findAll()
            .then(categories => {
            res.render('products', {categories, title: "Products", session: req.session ? req.session : "", errors : errors.mapped(),
            old : req.body,});
        })
        } 
                
        	},
        
        	// Update - Form to edit       /// falta terminar!!! **************
        	edit: (req, res) => {
        		// console.log("llegue al edit!")
        		//let idProduct = req.params.id;
        		// let product = products.find(product => product.id == req.params.id )
                db.Producto.findByPk(req.params.id)
                    .then(function(producto){
                        res.render('product-edit-form', {product: producto});
                    })
        		// console.log(product)
        		// res.render('product-edit-form', {product} );
        	},
        
        	// Update - Method to update        /// falta terminar!!! **************
        	update: (req, res) => {
                console.log("entre a update");
        		// let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
        		const id     = +req.params.id;
        
        		let name        = req.body.name;
        		let price       = req.body.price;
        		let discount    = req.body.discount;
        		let category    = req.body.category;
        		let description = req.body.description;
        		// let products     = product.findByPk(product => product.id == req.params.id )
        
                db.Producto.update({
                    id: id,
        			name: name,
        			price: price,
        			discount: discount,
        			category: category,
        			description: description,
                }, {
                    where: {id}
                })
                .then(() => {
                    res.redirect( '/products' );
                })
                .catch(err => {
                    console.log(err);
                })
        		// let editProduct = {
        
        		// 	id: id,
        		// 	name: name,
        		// 	price: price,
        		// 	discount: discount,
        		// 	category: category,
        		// 	description: description,
        		// 	image: Producto.image // traemos la imagen original
        
        		// };	
        
        		// for( let i in products ) {
        		// 	if( products[ i ].id === id ) {
        		// 		products[ i ] = editProduct;
        		// 		break;
        		// 	}
        		// }
                
        		// fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );
        		
        
        	},
        
        	// Delete - Delete one product from DB      
        	destroy : (req, res) => {
                console.log("entré al destroy")
                console.log(db.Producto)
                idDelete = +req.params.id;
                db.Producto.destroy({
                    where : { id: idDelete }
                })
                .then((event) => {
                    res.redirect('/products')
                })
                .catch(err => {
                    console.log(err);
                })
                
                
               
               
        		// let idProduct = req.params.id;
        		// let productAElim = products.find(product => product.id == idProduct)
        		// products.splice(productAElim.id-1, 1) // si le llega id=10, es que hay 11 productos. 
        		// fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );
        	},
            // edit: (req, res) => {
            //     		console.log("llegue al edit!")
            //     		let idProduct = req.params.id;
            //     		let product = producto.findByPk(product => product.id == req.params.id )
            //     		// console.log(product)
            //     		res.render('product-edit-form', {product} );
            //     	},
    detail: (req, res) => {                          
         db.Producto.findByPk(req.params.id, {
            // include: [{association: "name"}, {association: "imagen"}]
        })
        .then(products => {
            // console.log(products);
            res.render('productDetail', {product: products} );
        })
        .catch(err => {
            console.log(err);
        } )
        
        
        // const slider = db.Producto.findAll({
        //     // include: [{association: "name"}, {association: "imagen"}]
        // })
        // Promise.all([product,slider])
        // .then(([product, slider]) => {
        //     if (product !== null){ 
        //         let sliderProducts = slider.filter(element => element.discount > 0);    //  <----   Sololamente hay 2 productos por categoría, así que el slider muestra los 12 productos que hay hasta el momento
        //         let texto = product.description.split('\r\n')
        //         res.render('ProductoDetalle', {
        //             sliderTitle : "También te pueden interesar",
        //             sliderProducts,
        //             product,
        //             texto,
        //             n: false,
        //             title: product.name + " ",
        //             session: req.session ? req.session : ""
        //         }) 
        //     }else{
        //         res.send('No tenemos ese producto, pero tenemos muchos otros más...')
        //     }
        // })
        // .catch(error => console.log(error))
    },
    cart: (req, res) =>{

        res.render('cart', {title: "cart", session: req.session ? req.session : ""})
    },
    carrito: (req, res) => {

    },
    addToCart(req, res) { //agrega 1 producto al carrito y muestra el carrito actualizado.
        let idProduct = req.params.id; //recibo el ID como parametro de la vista detail.ejs
                carrito = db.Cart.create({
                    id_user: req.user.id, 
                   id_product: idProduct
                }) //leo el carrito actualizado. Puedo venir de un Delete o de un Add reciente.
                console.log(carrito)
                .then(()=>{

                    res.render("cart")
                }
                )
                .catch(e=>{
                    console.log(e);
                });
                 //busco en la lista de productos el producto que el usuario quiere agregar por su ID
        //         nuevoProd.id = Object.keys(carrito).length
        //         carrito.push(nuevoProd) //agrego el producto nuevo al carrito
        //         fs.writeFileSync (cartFilePath , JSON.stringify(carrito), {encoding: 'utf-8'}) //grabo el carrito
        //         res.redirect("/users/cart") //muestro la vista del carrito actualizado
        //       }
    
}}
