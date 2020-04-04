const GJV = require("geojson-validation");
const express = require('express')
const router = express.Router()
const service = require('../service')
const Logger = require('../logger_service')
const logger = new Logger()


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    logger.info('a request with /gis route recived')
    next()
})

router.get('/testpoint' , (req, res) =>{
    const lat = req.query.lat
    const long = req.query.long

    if(lat === undefined || long === undefined){
        logger.info('bad request in get')
        res.status(400).json({
            'message' : 'bad request'
        });
    }else{
        logger.info(`valid get request.point lat=${lat} long ${long}`)
        const result = service.findPoint(lat, long)
        logger.info('list of polygons with point inside them' , result)
        res.status(200).json(result);
    }
})

router.put('/addpolygon', function (req, res) {
    
    if (GJV.valid(req.body)) {
        console.log('valid!')
        const result = service.addPolygon(req.body)
        res.status(200).json(result);
    }else{
        res.status(400).json({
            'message' : 'bad request'
        });
    }

})

module.exports = router