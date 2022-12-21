'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ProductCtrl = require('./controllers/product')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/product', ProductCtrl.getProducts)
app.get('/api/product/:productId', ProductCtrl.getProduct)
app.post('/api/product', ProductCtrl.saveProduct)
app.put('/api/product/:productId', ProductCtrl.updateProduct)
app.delete('/api/product/:productId', ProductCtrl.deleteProduct)

module.exports = app;