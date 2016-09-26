
module.exports.compute = computeCenter;

// This function computes the center of minimum distance.
// TODO: fix computation bug.
function computeCenter(geocoordinates) {

    var currentPoint = computeMidpoint(geocoordinates);
    var minDistance = geocoordinates.reduce(function(t, c) { return t + geodistance(currentPoint, c) }, 0);
    
    console.log(currentPoint)
    console.log(minDistance * 3959);

    for (var i = 0; i < geocoordinates.length; i++) {
        var coordinate = geocoordinates[i];
        var totalDistance = geocoordinates.reduce(function(t, c) { return t + geodistance(coordinate, c) }, 0); 
        if (totalDistance < minDistance) {
            currentPoint = coordinate;
            minDistance = totalDistance;
        }
    }
    console.log(currentPoint)
    console.log(minDistance * 3959)

    var testDistance = 45;
    while (testDistance >= 0.00000002) {

        var diagonal = Math.sqrt(testDistance * testDistance / 2);
        var testCoordinates = [
            { lat: currentPoint.lat + testDistance, lng: currentPoint.lng                }, // N
            { lat: currentPoint.lat + diagonal,     lng: currentPoint.lng + diagonal     }, // NE
            { lat: currentPoint.lat,                lng: currentPoint.lng + testDistance }, // E
            { lat: currentPoint.lat - diagonal,     lng: currentPoint.lng + diagonal     }, // SE
            { lat: currentPoint.lat - testDistance, lng: currentPoint.lng                }, // S
            { lat: currentPoint.lat - diagonal,     lng: currentPoint.lng - diagonal     }, // SW
            { lat: currentPoint.lat,                lng: currentPoint.lng - testDistance }, // W
            { lat: currentPoint.lat + diagonal,     lng: currentPoint.lng - diagonal     }  // NW
        ]
        
        var flag = false;
        for (var i = 0; i < testCoordinates.length; i++) {
            var coordinate = testCoordinates[i];
            var totalDistance = geocoordinates.reduce(function(t, c) { return t + geodistance(coordinate, c) }, 0);
            if (totalDistance < minDistance) {
                currentPoint = coordinate;
                minDistance = totalDistance;
                flag = true;
                break;
            }
        }
    console.log(currentPoint)
    console.log(minDistance * 3959)

        if (!flag) testDistance /= 2;
    }

    return currentPoint;
}


// This function computes the geographic midpoint (center of gravity) of a set of points.
function computeMidpoint(geocoordinates) {
    
    // Convert latitude and longitude to cartesian coordinates.
    coordinates = geocoordinates.map(function(c) {
        var radlat = c.lat * Math.PI / 180; var radlng = c.lng * Math.PI / 180; // Radians.
        return { x: Math.cos(radlat) * Math.cos(radlng), y: Math.cos(radlat) * Math.sin(radlng), z: Math.sin(radlat) }
    })

    // Average of x, y, z coordinates.
    var avgx = coordinates.map(function(c) { return c.x }).reduce(function(t, c) { return t + c; }) / coordinates.length;
    var avgy = coordinates.map(function(c) { return c.y }).reduce(function(t, c) { return t + c; }) / coordinates.length;
    var avgz = coordinates.map(function(c) { return c.z }).reduce(function(t, c) { return t + c; }) / coordinates.length;
    
    // Compute midpoint.
    var midpoint = { lat: Math.atan2(avgz, Math.sqrt(avgx * avgx + avgy * avgy)) * 180 / Math.PI, lng: Math.atan2(avgy, avgx) * 180 / Math.PI };
    return midpoint;
}


// This function computes distance based on the spherical law of cosines.
function geodistance(coordinate1, coordinate2) {
    var lat1 = coordinate1.lat; var lng1 = coordinate1.lng;
    var lat2 = coordinate2.lat; var lng2 = coordinate2.lng;
    return Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1));
}


