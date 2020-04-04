const da = require('./dataAccess')
const inside_in_poygon = require('point-in-polygon');
const Logger = require('./logger_service')
const logger = new Logger()

function findPoint(lat , long){  
    let polygons = da.givePolygons();
    logger.debug('all the polygons in db', polygons)
    res = {
        pol : []
    }

    for (index = 0; index < polygons.length; index++) { 
        let inside  = is_inside(polygons[index], long , lat);
        if(inside === true) {
            let name = polygons[index]['properties']['name']
            res.pol.push(name)
        } 
        logger.debug(`point is inside ${name}`, inside);
    } 
    return res;
}

function is_inside(polygon, long , lat) {
    let polygon_cordinates = polygon['geometry']['coordinates'][0];
    return inside_in_poygon([ long, lat ], polygon_cordinates);
  }

function addPolygon(new_polygon){
    return da.addPolygonToDB(new_polygon);
}

module.exports = findPoint;

module.exports.findPoint = findPoint;
module.exports.addPolygon = addPolygon;
