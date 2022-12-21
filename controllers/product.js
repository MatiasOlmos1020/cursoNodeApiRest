'use strict'

const Product = require('../models/products');

function getProduct(req, res) {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `error al realizar la prticion: ${err}` });
        if (!product) return res.status(404).send({ message: `el producto no existe` });

        res.status(200).send({ product });
    });
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `error al realizar la prticion: ${err}` });
        if (!products) return res.status(404).send({ message: `No Existen productos cargados` });

        res.status(200).send({ products })
    })
}

function saveProduct(req, res) {
    console.log('POST /api/product');
    console.log(req.body);

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productStored) => {
        if (err) res.status(500).send({ message: `: ${err}Error al salvar en la base de datos: ${err}` });
        res.status(200).send({ product: productStored });
    })
}

function updateProduct(req, res) {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({ message: `Error al actualizar en la base de datos: ${err}` });

        res.status(200).send({ product: productUpdated })
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId;

    Product.findById(productId, (err) => {
        if (err) res.status(500).send({ message: `: Error al borrar en la base de datos: ${err}` });

        Product.remove(err => {
            if (err) res.status(500).send({ message: `: Error al borrar en la base de datos: ${err}` });
            res.status(200).send({ message: `El producto ha sido borrado` });
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}