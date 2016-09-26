
module.exports.getUsersHandler = getUsersHandler
module.exports.createUserHandler = createUserHandler

module.exports.getUserHandler = getUserHandler
module.exports.updateUserHandler = updateUserHandler
module.exports.deleteUserHandler = deleteUserHandler

module.exports.getUsersEventsHandler = getUsersEventsHandler;
module.exports.updateUsersEventsHandler = updateUsersEventsHandler;

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     description: DEVELOPER USE ONLY - Retrieves all the users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A user has been successfully retrieved
 *         type: array
 *         items:
 *           schema:
 *             $ref: '#/definitions/User'
 *   post:
 *     description: Creates a user
 *     parameters:
 *       - name: User
 *         in: body
 *         description: data about the user to be created
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User' 
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: A user has been successfully created
 *         headers:
 *           Location:
 *             description: The location of the newly created user
 *             type: string
 */

function getUsersHandler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'All the users have been successfully retrieved' };
    res.status(200).send(successJson).end();
};

function createUserHandler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Location', 'example-path');
    var successJson = { 'message': 'A user has been successfully created' };
    res.status(201).send(successJson).end();
};

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     description: Retrieves a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The unique identifier for the user
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An event has been successfully retrieved
 *         schema:
 *           $ref: '#/definitions/User'
 *   put:
 *     description: Updates a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The unique identifier for the user
 *         required: true
 *         type: string
 *       - name: updatedUser
 *         in: body
 *         description: The updated event
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A user has been successfully updated
 *   delete:
 *     description: Deletes a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The unique identifier for the user
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The user has been successfully deleted
 */

function getUserHandler(req, res) {

    var userId = req.params.userId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'User ' + userId + ' has been successfully retrieved' };
    res.status(200).send(successJson).end();
};

function updateUserHandler(req, res) {

    var userId = req.params.userId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'user ' + userId + ' has been successfully updated' };
    res.status(200).send(successJson).end();
};

function deleteUserHandler(req, res) {

    var userId = req.params.userId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'user ' + userId + ' has been successfully deleted' };
    res.status(200).send(successJson).end();
};

/**
 * @swagger
 * /api/v1/users/{userId}/events:
 *   get:
 *     description: Gets all the events associated with a particular user id
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The unique identifier for the user
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns a list of users
 *         type: array
 *         items:
 *           schema:
 *             $ref: '#/definitions/Event'
 *   put:
 *     description: Adds an event to the array of events
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The unique identifier for the user
 *         required: true
 *         type: string
 *       - name: eventId
 *         in: query
 *         description: the eventId of the event to add
 *         type: string
 *     responses:
 *       200:
 *         description: An event has successfully been added to the events array
 */

function getUsersEventsHandler(req, res) {

    var userId = req.params.eventId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'Events for user ' + userId + ' has been successfully retrieved' };
    res.status(200).send(successJson).end();
};

function updateUsersEventsHandler(req, res) {

    var userId = req.params.eventId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'Events for user ' + userId + ' has been successfully updated' };
    res.status(200).send(successJson).end();
};