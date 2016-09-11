/**
 *  This should include all the routing in the server
 *  If there is any file or handler created that should
 *  listen on a path add it to the 'routes' and it should
 *  be added to the listeners
 *  Note: It will be cleaner if function are in different
 *  files than this file and are imported here
 */
const apiRouter = require('express').Router();
const swaggerRoute = require('./server-swagger.js');
const debug = require('debug')('server:router');

// Exported module
module.exports.apiRouter = apiRouter;
module.exports.swaggerRouter = swaggerRoute;

/**
 * @swagger
 * /api/v1:
 *   get:
 *     description: Confirms that correct api is accessed
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: You have accessed SlapDash API
 */
apiRouter.get('/api/v1', apiV1Handler);

/**
 * Function that will verify that api/v1 is accessed
 * @param  {object} req The request http
 * @param  {object} res The http response
 */
function apiV1Handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var apiV1 = { 'message': 'You have accessed SlapDash API' };
    res.status(200).send(apiV1).end();
};
