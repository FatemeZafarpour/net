const express = require('express')
const app = express()
const gis = require('./routes/gis')
const winston = require('winston')
const dotenv = require('dotenv')
const Logger = require('./logger_service')
const logger = new Logger()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/' , (req , res)=>{
    res.send('firstPage');
})
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
    logger.info(`app is running on port ${process.env.PORT}`);
})