'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3001;

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