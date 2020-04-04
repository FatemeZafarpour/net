const fs = require("fs");
const path = require("path");

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
    console.log(updated_db)
    // console.log(GJV.isFeatureCollection(newGeoJSON))
    // console.log(GJV.isFeatureCollection(dbObj))
    // console.log(GJV.isFeatureCollection(GeoJSON2))

    let dbContent = JSON.stringify(updated_db);

    fs.writeFileSync(path.resolve(__dirname, "./db.json"), dbContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
    db = updated_db;
    return updated_db;
}

module.exports = addPolygonToDB;