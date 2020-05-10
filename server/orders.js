const { users } = require('./usersDetails');
const orders = {};

const addOrder = (username, orderDetails) => {
    if (!orders[users[username]]) {
        orders[users[username]] = [];
    }

    const timestamp = new Date().toLocaleString();
    orders[users[username]].push({ orderDetails, orderTime: timestamp });
};

const fetchOrders = (username) => {
    if (!orders[users[username]]) {
        orders[users[username]] = [];
    }

    return orders[users[username]];
}

module.exports = {
    addOrder,
    fetchOrders
};