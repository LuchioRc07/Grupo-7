const db    = require('../.././database/models');

const productController ={

    'list': async(req, res) => {
        await db.Producto.findAll()
        .then(prod => {
            res.status(200).json({
                meta: {
                    status: 200,
                    total: prod.length,
                    url: "api/product",
                },
                data: prod
            })
            .catch(error => {
                console.log(error);
                res.status(404).json({
                    meta: {
                        status: 404,
                        url: "api/product",
                        total: "prod.length"
                    },
                    data: "Not found"
                });
            });
    })},
    'detail': async(req, res) => {
        await db.Producto.findAll()
        .then(product => {
            res.status(200).json({
                meta: {
                    status: 200,
                    url: "api/product/{id}"
                },
                data: {
                    // id: product.id,
                    // price: product.price,
                    // category: product.category,
                    // description: product.description,
                    // name: product.name,
                    // Image: product.image
                    product
                }})
        })
            .catch(err => {
                res.status(404).json({
                    meta:{
                        status:404,
                        url: "api/product/{id}"
                    },
                    data: "not found"
                })
            })
        },
    'lastProduct': async(req, res) => {
        await db.Producto.findAll()
        .then(products => {
            res.status(200).json({
                meta :{
                    status:200,
                    url: "api/product/last"
                },
                data: products.slice(-1)
            });
        })
        .catch((err) => {
            res.status(404).json({
                meta: {
                    status: 404,
                    url: "api/product/last"
                },
                data: "Not found"
            })
            });
        }
    }



module.exports = productController;