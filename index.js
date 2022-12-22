'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.set('strictQuery', false);
mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`error al conectar a la base de datos: ${err}`)
    }
    console.log("conección a la base de datos establecida")

    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    })
});