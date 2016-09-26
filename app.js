const http = require('http');
const debug = require('debug');
const server = require('./lib/server.js');
const database = require('./database/database.js');
/**
 * Set the debug for this file the 'app' debugger
 */
const appDebug = debug('app');
var port = getPort();

// Start the server
var slapDashServer = http.createServer(server);
database.databaseInit();

slapDashServer.listen(port);
slapDashServer.on('error', httpOnError);
slapDashServer.on('listening', httpOnListening);


/**
 * Function to be called if the server failed opening
 * @param error The error reason 
 */
function httpOnError(err) {
    appDebug("Server failed to start the server:");
    appDebug(err);
    process.exit(1);
}

/** 
 * Function to be called when server starts
 */
function httpOnListening() {
    var addr = slapDashServer.address();
    var bind = typeof addr === 'string' 
    	? 'pipe ' + addr 
    	: 'port ' + addr.port;
    appDebug('Listening on ' + bind);
}

/**
 * Will return the port that server should run on
 */
function getPort() {
    var newPort;
    if (process.env.PORT) { // get the port from environment
        newPort = parseInt(process.env.PORT, 10);
    } else {
        newPort = 4000;
    }
    return newPort;
}