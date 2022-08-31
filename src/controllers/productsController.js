const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render ("products", {products, toThousand})
	},

	// Detail - Detail from one product 
	detail: (req, res) => {
		let idProduct = req.params.id;
		let product = products.find(product => product.id == idProduct)
		res.render("productDetail", {product, toThousand})
	},

	// Create - Form to create   /// falta terminar!!! **************  Hay que poner un boton de Agregar Producto en la lista de productos o en en Header que vaya a http://localhost:3011/products/create 
	create: (req, res) => {
		res.render("product-create-form")
	},
 
	// Create -  Method to store   /// falta terminar!!! **************
	store: (req, res) => {
		console.log("llegue al store!")

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const idN = products.length

		let name        = req.body.name;
		let price       = req.body.price;
		let discount    = req.body.discount;
		let category    = req.body.category;

		let product = {
			id:idN,
			name: name,
			price: price,
			discount: discount,
			category: category,
			image: "generica.png" // falta poner la imagen q sube el usuario
		}
		products.push(product)
		//console.log(product)
		//guardarlo!
		fs.writeFileSync (productsFilePath , JSON.stringify(products), {encoding: 'utf-8'})

		res.redirect('/') // redirige a http://localhost:3011/products/
		
	},

	// Update - Form to edit       /// falta terminar!!! **************
	edit: (req, res) => {
		// console.log("llegue al edit!")
		//let idProduct = req.params.id;
		let product = products.find(product => product.id == req.params.id )
		// console.log(product)
		res.render('product-edit-form', {product} );
	},

	// Update - Method to update        /// falta terminar!!! **************
	update: (req, res) => {

		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
		const id     = +req.params.id;

		let name        = req.body.name;
		let price       = req.body.price;
		let discount    = req.body.discount;
		let category    = req.body.category;
		let description = req.body.description;
		let product = products.find(product => product.id == req.params.id )


		let editProduct = {

			id: id,
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description,
			image: product.image // traemos la imagen original

		};	

		for( let i in products ) {
			if( products[ i ].id === id ) {
				products[ i ] = editProduct;
				break;
			}
		}
		
		fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );
		res.redirect( '/' );

	},

	// Delete - Delete one product from DB      
	destroy : (req, res) => {

		let idProduct = req.params.id;
		let productAElim = products.find(product => product.id == idProduct)
		products.splice(productAElim.id-1, 1) // si le llega id=10, es que hay 11 productos. 
		fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );
		res.redirect('/products')



	}
};

module.exports = controller;


// posible controller

// //const { products } = require('../data/productsDB');
// const db = require('../database/models');


// module.exports = {
//     producto: (req, res) => {
//         db.Product.findAll({
//             include: [{association: "category"}, {association: "images"}]
//         })
//         .then((products) => {
//             res.render('Productos', {products, n:false,title:"Productos", session: req.session ? req.session : ""});
//         })
//         .catch(err => console.log(err))
//     },
//     detalle: (req, res) => {                             //  Fabio
//         const product = db.Product.findByPk(req.params.idProducto, {
//             include: [{association: "category"}, {association: "images"}]
//         })
//         const slider = db.Product.findAll({
//             include: [{association: "category"}, {association: "images"}]
//         })
//         Promise.all([product,slider])
//         .then(([product, slider]) => {
//             if (product !== null){ 
//                 let sliderProducts = slider.filter(element => element.discount > 0);    //  <----   Sololamente hay 2 productos por categoría, así que el slider muestra los 12 productos que hay hasta el momento
//                 let texto = product.description.split('\r\n')
//                 res.render('ProductoDetalle', {
//                     sliderTitle : "También te pueden interesar",
//                     sliderProducts,
//                     product,
//                     texto,
//                     n: false,
//                     title: product.name + " | FTS-Tuning",
//                     session: req.session ? req.session : ""
//                 }) 
//             }else{
//                 res.send('No tenemos ese producto, pero tenemos muchos otros más...')
//             }
//         })
//         .catch(error => console.log(error))
//     },
//     carrito: (req, res) =>{
//         res.render('Carrito', {title: "Carrito", session: req.session ? req.session : ""})
//     },
//     categoria: (req,res) =>{
//         const category = db.Category.findOne({
//             where: {
//                 name: req.params.categoria.trim()
//             }
//         })
//         const products = db.Product.findAll({
//             include: [{association: "category"}, {association: "images"}]
//         })
//         Promise.all([category, products])
//         .then(([category, products] )=> {
            
//             let filtradosPorCategoria = []
//             products.forEach(producto =>{
//                 if(producto.category_id === category.id){
//                     filtradosPorCategoria.push(producto)
//                 }
//             })
            
            
//             if(filtradosPorCategoria.length > 0){
//                 res.render('Productos', {products: filtradosPorCategoria,n: true,category,title:"Categoría", session: req.session ? req.session : ""})
//             }else {  
//                 res.render('Productos', {products, title:"Categoria",n: false,category,session: req.session ? req.session : ""})
//             }   
//         })
//     }
// }
