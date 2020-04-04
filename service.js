const addPolygonToDB = require('./dataAccess')

function findPoint(lat , long){
    return {
        'lat' : 'lat',
        'long' : 'long'
    }
}

function addPolygon(new_polygon){
    return addPolygonToDB(new_polygon);
}

module.exports = findPoint;

module.exports.findPoint = findPoint;
module.exports.addPolygon = addPolygon;
