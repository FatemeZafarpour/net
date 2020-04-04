const GJV = require("geojson-validation");
const express = require('express')
const router = express.Router()
const service = require('../service')



// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/testpoint' , (req, res) =>{
    const lat = req.query.lat
    const long = req.query.long

    if(lat === undefined || long ===undefined){
        res.status(400).json({
            'message' : 'bad request'
        });
    }else{
        const result = service.findPoint(lat, long)
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