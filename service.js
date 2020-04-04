const da = require('./dataAccess')
const inside = require('point-in-polygon');

function findPoint(lat , long){  
    let polygons = da.givePolygons();
    
    res = {
        pol : []
    }

    for (index = 0; index < polygons.length; index++) { 
        if(myFunction(polygons[index], long , lat) == true) {
            let name = polygons[index]['properties']['name']
            res.pol.push(name)
        } 
    } 
    return res;
}

function myFunction(polygon, long , lat) {
    let polygon_cordinates = polygon['geometry']['coordinates'][0];
    return inside([ long, lat ], polygon_cordinates);
  }

function addPolygon(new_polygon){
    return da.addPolygonToDB(new_polygon);
}

module.exports = findPoint;

module.exports.findPoint = findPoint;
module.exports.addPolygon = addPolygon;
