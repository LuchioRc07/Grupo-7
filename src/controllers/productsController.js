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

	// Create - Form to create   /// falta terminar!!! ************** 
	create: (req, res) => {
		res.render("product-create-form")
	},
 
	// Create -  Method to store   /// falta terminar!!! **************
	store: (req, res) => {
		console.log("llegue al store!")
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const idN = products.lenght

		let name        = req.body.name;
		let price       = req.body.price;
		let discount    = req.body.discount;
		let category    = req.body.category;
		let description = req.body.description;

		let product = {
			id:idN,
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description,
		}
		products.push(product)
		console.log(product)
		//guardarlo!
		fs.writeFileSync (productsFilePath , JSON.stringify(products), {encoding: 'utf-8'})

		res.redirect('/')
		
	},

	// Update - Form to edit       /// falta terminar!!! **************
	edit: (req, res) => {
		console.log("llegue al edit!")
		let idProduct = req.params.id;
		let product = products.find(product => product.id == idProduct)
		console.log(product)
		res.render( 'product-edit-form', { title: product.name, productToEdit: product} );
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

		let editProduct = {

			id: id,
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description

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

	// Delete - Delete one product from DB      /// falta terminar!!! **************
	destroy : (req, res) => {
		console.log("llegue al delete!")
		let idProduct = req.params.id;
		let productAElim = products.find(product => product.id == idProduct)
		products.splice(productAElim.id-1, 1)
		console.log(products)
		res.redirect('/products')

	}
};

module.exports = controller;