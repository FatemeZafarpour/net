const express = require('express')
const app = express()
const gis = require('./routes/gis')
const winston = require('winston')
const dotenv = require('dotenv')
const fs = require("fs");
const path = require("path");

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/gis', gis)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);

})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

})

app.listen(process.env.PORT || 3000, () => {
    console.log(`listenning on port ${process.env.PORT}`);
})