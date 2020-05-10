const users = {};
const { v4: uuidv4 } = require('uuid');

const addUserIfNotExists = (username) => {
    if (!users[username]) {
        users[username] = uuidv4();
    }
};

const fetchUserId = (username) => {
    return users[username];
}

module.exports = {
    users,
    addUserIfNotExists,
    fetchUserId
};