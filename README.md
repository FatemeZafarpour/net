# net
first homework for Network Engineering
put request adds a new polygon to the database (that is a json file of all the polygons). this code checks the validation of new polygon and if it's invalid returns a response with status = 400, that means it's a bad request. otherwise returns a response with status=200 and all the data in the format of json.
by getting latitude and longitude of a point, tell which polygons the point is inside them. (if the format of request doesn't be right, response with status = 400 will be returned.)
other requests are invalid. (404 not found)
