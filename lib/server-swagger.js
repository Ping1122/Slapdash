const swaggerRouter = require('express').Router();
const swaggerJSDoc = require('swagger-jsdoc');
const debug = require('debug')('server:swagger');

module.exports = swaggerRouter;

// ============================== $ Swagger $ =====================================

// Set up the swagger api - swagger definition
var swaggerDefinition = {
    info: {
        title: 'SlapDash Swagger API',
        version: '0.0.1',
        description: 'Get together app that will help you get with your friends when you don\'t know what to do',
    },
    host: 'localhost:' + process.env.PORT,
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: [
    './api/*.js',
    './lib/*.js',
    './api/*.yaml',
    './lib/*.yaml'
    ]
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
debug('Swagger Json is:' + swaggerSpec);

// ============================== $ Swagger $ =====================================


// Handlers
swaggerRouter.get('/', serveSwagger);

/**
 * Serves the swagger json for the api
 * @param  {object} req The request http
 * @param  {object} res The http response
 */
function serveSwagger(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
}