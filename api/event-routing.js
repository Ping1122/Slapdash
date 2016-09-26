
module.exports.getEventsHandler = getEventsHandler
module.exports.createEventHandler = createEventHandler

module.exports.getEventHandler = getEventHandler
module.exports.updateEventHandler = updateEventHandler
module.exports.deleteEventHandler = deleteEventHandler

module.exports.getEventUsersHandler = getEventUsersHandler;
module.exports.updateEventUsersHandler = updateEventUsersHandler;

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     description: DEVELOPER USE ONLY - Retrieves all the active events
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All the events have been successfully retrieved
 *         type: array
 *         items:
 *           schema:
 *             $ref: '#/definitions/Event'
 *   post:
 *     description: Creates an event
 *     parameters:
 *       - name: Event
 *         in: body
 *         description: data about the event to be created
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Event' 
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: An event has been successfully created
 *         headers:
 *           Location:
 *             description: The location of the newly created event
 *             type: string
 */

function getEventsHandler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'All the events have been successfully retrieved' };
    res.status(200).send(successJson).end();
};

function createEventHandler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Location', 'example-path');
    var successJson = { 'message': 'An event has been successfully created' };
    res.status(201).send(successJson).end();
};

/**
 * @swagger
 * /api/v1/events/{eventId}:
 *   get:
 *     description: Retrieves an event
 *     parameters:
 *       - name: eventId
 *         in: path
 *         description: The unique identifier for the event
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An event has been successfully retrieved
 *         schema:
 *           $ref: '#/definitions/Event'
 *   put:
 *     description: Updates an event
 *     parameters:
 *       - name: eventId
 *         in: path
 *         description: The unique identifier for the event
 *         required: true
 *         type: string
 *       - name: updatedEvent
 *         in: body
 *         description: The updated event
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/Event'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An event has been successfully updated
 *   delete:
 *     description: Deletes an event
 *     parameters:
 *       - name: eventId
 *         in: path
 *         description: The unique identifier for the event
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The event has been successfully deleted
 */

function getEventHandler(req, res) {

    var eventId = req.params.eventId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'Event ' + eventId + ' has been successfully retrieved' };
    res.status(200).send(successJson).end();
};

function updateEventHandler(req, res) {

    var eventId = req.params.eventId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'Event ' + eventId + ' has been successfully updated' };
    res.status(200).send(successJson).end();
};

function deleteEventHandler(req, res) {

    var eventId = req.params.eventId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'Event ' + eventId + ' has been successfully deleted' };
    res.status(200).send(successJson).end();
};

/**
 * @swagger
 * /api/v1/events/{eventId}/users:
 *   get:
 *     description: Gets all the users associated with a particular event id
 *     parameters:
 *       - name: eventId
 *         in: path
 *         description: The unique identifier for the event
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns a list of users
 *         schema:
 *           $ref: '#/definitions/EventUsers'
 *   put:
 *     description: Adds a user to the event
 *     parameters:
 *       - name: eventId
 *         in: path
 *         description: The unique identifier for the event
 *         required: true
 *         type: string
 *       - name: userId
 *         in: query
 *         description: The user to be added
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Adds a user to the event
 *         schema:
 *           $ref: '#/definitions/EventUsers'
 */

function getEventUsersHandler(req, res) {

    var eventId = req.params.eventId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'Users for event ' + eventId + ' has been successfully retrieved' };
    res.status(200).send(successJson).end();
};

function updateEventUsersHandler(req, res) {

    var eventId = req.params.eventId;

    res.setHeader('Content-Type', 'application/json');
    var successJson = { 'message': 'Users for event ' + eventId + ' has been successfully updated' };
    res.status(200).send(successJson).end();
};