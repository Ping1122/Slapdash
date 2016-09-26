const debug = require('debug')('engine:main')
const GeoModule = require('./geolib.js')

module.exports.engine = engineInit;
module.exports.run = runTest;

// TODO: Tweak these settings so Yelp returns the correct results.
var yelpSettings = {}
yelpSettings.defaultSearch = {
    food: 'food',
    drink: 'bar',
    play: 'fun?',
    slapdash: '',

    initialRadius: '5',     // miles?
    radiusIncrease: '2',    // added to initial radius if the search doesn't return enough results.
    randomness: 'salt'      
        // TODO: probably need to add other settings too.
}

/**
 * Perform initialization for engine module
 */
function engineInit () {
	 debug('Initialized');
}

// TODO: Move this into a unit test module
function runTest () {
    var list = [
        { lat: 47.6002, lng: -122.3321 },   // Seattle, WA
        { lat: 37.2296, lng: -80.4139 },    // Blacksburg, VA
        { lat: 29.7604, lng: -95.3698 }     // Houston, TX
    ];
    console.log(GeoModule.compute(list));
}

// This function decides on a location 
function decide(users) {

    // TODO: map user info and compute location

    // TODO: Call Yelp.

    // TODO: Sprinkle some salt.

    // TODO: Choose a place.
}
