const { users } = require('./usersDetails');
const cart = {};

const addToCart = (username, productId, quantity) => {
    if (!cart[users[username]]) {
        cart[users[username]] = {};
    }

    if (quantity === 0) {
        delete cart[users[username]][productId];
        return;
    }

    cart[users[username]][productId] = quantity;
};

const clearCart = (username) => {
    delete cart[users[username]];
}

const fetchCart = (username) => {
    if (!cart[users[username]]) {
        cart[users[username]] = {};
    }

    return cart[users[username]];
}

module.exports = {
    addToCart,
    clearCart,
    fetchCart
};