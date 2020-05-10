const { addUserIfNotExists } = require('./usersDetails');
const { v4: uuidv4 } = require('uuid');
const sessions = {};

const addSession = (username) => {
    addUserIfNotExists(username);

    const sessionId = uuidv4();
    sessions[sessionId] = username;
    return sessionId;
};

const deleteSession = (sessionId) => {
    const username = sessions[sessionId];
    delete sessions[sessionId];
    return username;
};

module.exports = {
    sessions,
    addSession,
    deleteSession,
};