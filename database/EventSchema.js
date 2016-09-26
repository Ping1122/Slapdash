const debug = require('debug')('database:event');
const User = require('./UserSchema.js').user;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// ============================= $ Schema $ ====================================
var EventSchema = new Schema({
    title: {
        type: String,
        default: 'New Event'
    },
    description: {
        type: String,
        default: 'Event Description'
    },
    category: {
        type: String,
        enum: ['Food', 'Play', 'Drink', 'SlapDash']
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    capacity: {
        type: Number,
        min: 1
    },
    starttime: Date,
    createtime: Date,
    invitations: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    timeout: {
        type: Number,
        min: 60 * 5 * 1000,
        /* 5 Min */
        default: 60 * 15 * 1000 /* 15 Min */
    },
    userpermissions: {
        type: String,
        enum: ['Open', 'Closed', 'Approval'],
        default: 'Open'
    },
    canceled: Boolean
});

var Event = mongoose.model('Event', EventSchema);

// ============================= $ Helpers $ ====================================
/**
 * The wrapper for creating a 
 * @param {object} newEvent The event specification based on EventSchema
 * @param {object} user The user that has created this event.
 * @param {Function} callback The function that will be called after
 *                      the function is done. The callback function 
 *                      should accept to parameters here is an example 
 *                      of an acceptable callback
 *
 *                      function doSomething(err, eventInstance)
 *
 * When there is a error saving the fall callback will only be called
 * with the err parameter.
 */
function CreateEvent(newEvent, userId, callback) {
    if (!callback || typeof callback !== 'function') {
        throw "Function CreateEvent needs a function for the callback";
    }
    var eventInstance = new Event(newEvent);

    /* Set the admin attribute */
    User.findOne({ _id: userId }, function(err, user) {
        if (err) {
            callback("err: couldn't find a user with userId:" + userId);
            return;
        }
        eventInstance.admin = userId;
        user.eventsjoined.push(eventInstance._id);
        user.save(function(errSaveUser) {
            if (errSaveUser) { // Error is not null so error happened
                callback(errSaveUser);
                debug('Error happened saving the user: ' + errSaveUser);
            }
            eventInstance.save(function(errSave) {
                if (errSave) { // Error is not null so error happened
                    callback(errSave);
                    debug('Error happened saving the event: ' + errSave);
                }
                // Went OK and having a callback
                callback(null, eventInstance);
            });
        });
    });
}

// ========================================================================
/**
 * Invite a single friend to an event using their userId
 * @param {object}   eventId   The id of event to invite friend to
 * @param {ObjectId} inviterId Id of user who is inviting the friend
 * @param {ObjectId} userId    Id of the user being invited to the event
 * @param {Function} callback  The callback will be called when the function
 *                             was either successful to invite the friend or
 *                             an error occurred during the process.
 * Two main error this method will throw is when the inviterId is not
 * authorized to invite the user So the error will be either 'Closed' or 
 * 'Approval'.
 */
function InviteFriend_Id(eventId, inviterId, userId, callback) {
    if (!callback || typeof callback !== 'function') {
        throw "Function InviteFriend_Id needs a function for the callback";
    }

    if (userId.length) {
        throw new Error("This function expects the userId to be a single ObjectId");
    }


    Event.findOne({ _id: eventId }, function(err, event) {
        // Handle the err
        if (err) {
            callback(err);
            return;
        }

        var permission = UserCanInviteToEvent(event, inviterId);
        if(permission === 0){
            callback('Approval');
            return;
        } else if (permission === -1){
            callback('Closed');
            return;
        }
        // add UserId to the list of invitations
        event.invitations.push(userId);
        event.save(function(errSave) {
            if (errSave) callback(errSave);
            else callback(null, event);
        });
    });
}

// ========================================================================
/**
 * Invite a single friend to an event using the user facebook tokenId.
 * @param {object}   eventId   The id of event to invite friend to
 * @param {ObjectId} inviterId Id of user who is inviting the friend
 * @param {ObjectId} userFbId  FacebookId of the user being invited to the event
 * @param {Function} callback  The callback will be called when the function
 *                             was either successful to invite the friend or
 *                             an error occurred during the process.
 * Two main error this method will throw is when the inviterId is not
 * authorized to invite the user So the error will be either 'Closed' or 
 * 'Approval'.
 */
function InviteFriend_FbId(eventId, inviterId, userFbId, callback) {
    if (!callback || typeof callback !== 'function') {
        throw "Function InviteFriends_Id needs a function for the callback";
    }

    Event.findOne({ _id: eventId }, function(err, event) {
        // Handle the err
        if (err) {
            callback(err);
            return
        }

        // Check for invitation permission
        var permission = UserCanInviteToEvent(event, inviterId);
        if(permission === 0){
            callback('Approval');
            return;
        } else if (permission === -1){
            callback('Closed');
            return;
        }

        User.findOne({ fbtokenid: userFbId }, function(err, user) {
            if (!user._id) {
                callback("The user doesn't have attribute _id defined");
                return;
            }

            event.invitations.push(user._id);
            event.save(function(err) {
                if (err) callback(err);
                else callback(null, event);
            });

        });
    });
}

// ========================================================================
/**
 * Invite a multiple friends to an event using their userIds
 * @param {object}   eventId   The id of event to invite friend to
 * @param {ObjectId} inviterId Id of user who is inviting the friend
 * @param {Array} userIdsArray Array of Ids of the user being invited to the event
 * @param {Function} callback  The callback will be called when the function
 *                             was either successful to invite the friend or
 *                             an error occurred during the process.
 * Two main error this method will throw is when the inviterId is not
 * authorized to invite the user So the error will be either 'Closed' or 
 * 'Approval'.
 */
function InviteFriends_Id(eventId, inviterId, userIdsArray, callback) {
    if (!callback || typeof callback !== 'function') {
        throw "Function InviteFriends_Id needs a function for the callback";
    }

    // Make sure userIdsArray is actually and array
    if (!userIdsArray.length) {
        throw new Error('userIdsArray needs to be an array');
    }

    Event.findOne({ _id: eventId }, function(err, event) {
        // Handle the err
        if (err) {
            callback(err);
            return
        }

        // Check for invitation permission
        var permission = UserCanInviteToEvent(event, inviterId);
        if(permission === 0){
            callback('Approval');
            return;
        } else if (permission === -1){
            callback('Closed');
            return;
        }

        for (const userId of userIdsArray) {
            // add UserId to the list of invitations
            event.invitations.push(userId);
        }
        event.save(function(err) {
            if (err) callback(err);
            // Went OK
            else callback(null, event);
        });
    });
}

// ========================================================================
/**
 * Invite a multiple friends to an event using the users facebook tokenId.
 * @param {object}   eventId   The id of event to invite friend to
 * @param {ObjectId} inviterId Id of user who is inviting the friend
 * @param {Array} userFbIdArray Array of FacebookIds of the users being invited to the event
 * @param {Function} callback  The callback will be called when the function
 *                             was either successful to invite the friend or
 *                             an error occurred during the process.
 * Two main error this method will throw is when the inviterId is not
 * authorized to invite the user So the error will be either 'Closed' or 
 * 'Approval'.
 */
function InviteFriends_FbId(eventId, inviterId, userFbIdArray, callback) {
    if (!callback || typeof callback !== 'function') {
        throw "Function InviteFriends_Id needs a function for the callback";
    }

    if (!userFbIdArray.length) {
        throw new Error('userFbIdArray needs to be an array');
    }

    Event.findOne({ _id: eventId }, function(err, event) {
        // Handle the err
        if (err) {
            callback(err);
            return;
        }

        // Check for invitation permission
        var permission = UserCanInviteToEvent(event, inviterId);
        if(permission === 0){
            callback('Approval');
            return;
        } else if (permission === -1){
            callback('Closed');
            return;
        }

        User.find({ fbtokenid: { $in: userFbIdArray } }, function(err, users) {
            // Handle the err
            if (err) {
                callback(err);
                return;
            }

            /* Iterate through all the users to be invited */
            for (const user of users) {
                if (!user._id) {
                    callback("The user doesn't have attribute _id defined");
                    return;
                }
                event.invitations.push(user._id);
            }

            /* Save the event after ward */
            event.save(function(err) {
                if (err) callback(err);
                else callback(null, event);
            });
        });
    });
}

// ==========================================================================
/**
 * Can respond to an event invitation using the eventId and the userId 
 * responding.
 * @param {ObjectId}  eventId  The id of event to invite friend to
 * @param {ObjectId}  userId   Id of the user being invited to the event
 * @param {boolean}   accept   True if user accepted. False if user denied
 * @param {Function}  callback To be called when the responding has been processed
 */
function Respond_To_Invitation(eventId, userId, accept, callback) {
    if (!callback || typeof callback !== 'function') {
        throw "Function Respond_To_Invitation needs a function for the callback";
    }

    /* First find the event with the given id */
    Event.findOne({ _id: eventId }, function(err, event) {
        // Handle the err
        if (err) {
            callback(err);
            return;
        }
        User.findOne({ _id: userId }, function(err, user) {
            if (err) {
                callback(err);
                return;
            }

            // If userId has invitation
            if (event.invitations.indexOf(user._id) >= 0) {
                if (accept) {
                    event.attendees.push(user._id);
                    /* Save the event after ward */
                    event.save(function(err) {
                        if (err) callback(err);
                        else callback(null, event);
                    });
                } else {
                    callback(null, event);
                }
                // If the  user is not in the list of invitees 
            } else {
                callback("User is not invited to the event.");
            }
        });
    });
}

// ==========================================================================
/**
 * Validates that the user with the given Id has permission to 
 * invite to a specific events.
 * @param {object} event       The event that a user is being invited
 * @param {ObjectId} inviterId The Object Id of user that is inviting
 */
function UserCanInviteToEvent(event, inviterId) {
    if (event.admin.equals(inviterId)) {
        return 1; // Admin can invite others
    } else if (event.invitations.indexOf(inviterId) >= 0) {
        if (!event.userpermissions || event.userpermissions === 'Open') {
            return 1; // No user permission so its Open or Open
        } else if (event.userpermissions === 'Closed') {
            return -1; // doesn't have permission
        } else {
            return 0; // Need Admin Approval
        }
    } else { // User not admin or invitee
        return -1;
    }
}

module.exports.event = Event;
module.exports.createEvent = CreateEvent;
module.exports.inviteFriend_Id = InviteFriend_Id;
module.exports.inviteFriends_Id = InviteFriends_Id;
module.exports.inviteFriend_FbId = InviteFriend_FbId;
module.exports.inviteFriends_FbId = InviteFriends_FbId;
module.exports.respond_To_Invitation = Respond_To_Invitation;
