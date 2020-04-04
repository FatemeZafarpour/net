const fs = require("fs");
const path = require("path");
const Logger = require('./logger_service')
const logger = new Logger()

let db;
fs.readFile(path.resolve(__dirname, "./db.json"), function (err, data) {
    //fs.readFile("../db.json", function(err, data) { 

    // Check for errors 
    if (err) throw err;

    // Converting to JSON 
    db = JSON.parse(data);
    
})

function addPolygonToDB(new_polygon){
    
    let updated_db = {
        "type": "FeatureCollection",
        "features": [...db.features, new_polygon]
    }
    // console.log(updated_db)

    let dbContent = JSON.stringify(updated_db);

    fs.writeFileSync(path.resolve(__dirname, "./db.json"), dbContent, 'utf8', function (err) {
        if (err) {
            logger.error('An error occured while writing new polygon to db.')
            return console.log(err);
        }
        logger.info('new polygon has been saved.')
    });
    db = updated_db;
    return updated_db;
}


function givePolygons(){
    return db.features;
}

module.exports.addPolygonToDB = addPolygonToDB;
module.exports.givePolygons = givePolygons;