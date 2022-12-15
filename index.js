'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/products')

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/product', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `error al realizar la prticion: ${err}` });
        if (!products) return res.status(404).send({ message: `Noa Existen productos cargados` });

        res.status(200).send({ products })
    })

})

app.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `error al realizar la prticion: ${err}` });
        if (!product) return res.status(404).send({ message: `el producto no existe` });

        res.status(200).send({ product });
    });
})

app.post('/api/product', (req, res) => {
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
})

app.put('/api/product/:productId', (req, res) => {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({ message: `Error al actualizar en la base de datos: ${err}` });

        res.status(200).send({ product: productUpdated })
    })
})

app.delete('/api/product/:productId', (req, res) => {
    let productId = req.params.productId;

    Product.findById(productId, (err) => {
        if (err) res.status(500).send({ message: `: Error al borrar en la base de datos: ${err}` });

        Product.remove(err => {
            if (err) res.status(500).send({ message: `: Error al borrar en la base de datos: ${err}` });
            res.status(200).send({ message: `El producto ha sido borrado` });
        })
    })
})


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/shop', (err, res) => {
    if (err) {
        return console.log(`error al conectar a la base de datos: ${err}`)
    }
    console.log("conección a la base de datos establecida")

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`);
    })
});