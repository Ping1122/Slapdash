
module.exports.computeMidpoint = computeMidpoint

// This function computes the geographic midpoint (center of gravity) of a set of points.
// TODO: Compute center of minimum distance from this.
function computeMidpoint(geocoordinates) {
    
    // Convert latitude and longitude to cartesian coordinates.
    coordinates = geocoordinates.map(function(c) {
        var radlat = c.lat * Math.PI / 180; var radlng = c.lng * Math.PI / 180; // Radians.
        return {x: Math.cos(radlat) * Math.cos(radlng), y: Math.cos(radlat) * Math.sin(radlng), z: Math.sin(radlat)}
    })

    // Average of x, y, z coordinates.
    var avgx = coordinates.map(function(c) { return c.x }).reduce(function(p, c) { return p + c; }) / coordinates.length;
    var avgy = coordinates.map(function(c) { return c.y }).reduce(function(p, c) { return p + c; }) / coordinates.length;
    var avgz = coordinates.map(function(c) { return c.z }).reduce(function(p, c) { return p + c; }) / coordinates.length;
    
    // Compute midpoint.
    var centroid = [ Math.atan2(avgz, Math.sqrt(avgx * avgx + avgy * avgy)) * 180 / Math.PI, Math.atan2(avgy, avgx) * 180 / Math.PI ];
    return centroid;
}

