const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

const { products, addReview } = require('./storeInventory');
const { sessions, addSession, deleteSession } = require('./session');
const { addToCart, clearCart, fetchCart } = require('./cart');
const { addOrder, fetchOrders } = require('./orders');
const auth = require('./auth');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json())

app.get('/session', express.json(), (req, res) => {
    const sid = req.cookies.sid;

    if (!sid) {
        res.status(401).json({ code: 'LOGIN_REQUIRED' });
        return;
    }

    if (!sessions[sid]) {
        res.clearCookie('sid');
        res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
        return;
    }

    res.status(200).json(sessions[sid]);
});

app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.clearCookie('sid');

    if (!username || username.trim().length == 0) {
        res.status(400).json({ code: 'USERNAME_REQUIRED' });
        return;
    }

    if (!password || password.trim().length == 0) {
        res.status(400).json({ code: 'PASSWORD_REQUIRED' });
        return;
    }

    if (!auth.isPermitted(username)) {
        res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
        return;
    }

    const sessionId = addSession(username);
    res.cookie('sid', sessionId);
    res.status(200).json({ sessionId, username });
});

app.delete('/session', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    res.clearCookie('sid');
    deleteSession(sid);
    res.sendStatus(200);
});

app.get('/products', express.json(), (req, res) => {
    const sid = req.cookies.sid;

    if (!sid) {
        res.status(401).json({ code: 'LOGIN_REQUIRED' });
        return;
    }

    if (!sessions[sid]) {
        res.clearCookie('sid');
        res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
        return;
    }

    res.status(200).json(products);
});

app.post('/review', express.json(), (req, res) => {
    const sid = req.cookies.sid;

    if (!sid) {
        res.status(401).json({ code: 'LOGIN_REQUIRED' });
        return;
    }

    if (!sessions[sid]) {
        res.clearCookie('sid');
        res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
        return;
    }

    const ratingDetails = parseInt(req.body.rating);
    const reviewText = req.body.text;
    const productId = parseInt(req.body.productId);

    if (!ratingDetails && (!reviewText || reviewText.length == 0)) {
        res.status(400).json({ code: 'INVALID_REVIEW' });
        return;
    }

    addReview(productId, sessions[sid], ratingDetails, reviewText);

    res.status(200).json(products);
});

app.get('/cart', express.json(), (req, res) => {
    const sid = req.cookies.sid;

    if (!sid) {
        res.status(401).json({ code: 'LOGIN_REQUIRED' });
        return;
    }

    if (!sessions[sid]) {
        res.clearCookie('sid');
        res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
        return;
    }

    res.status(200).json(fetchCart(sessions[sid]));
});

app.post('/cart', express.json(), (req, res) => {
    const sid = req.cookies.sid;

    if (!sid) {
        res.status(401).json({ code: 'LOGIN_REQUIRED' });
        return;
    }

    if (!sessions[sid]) {
        res.clearCookie('sid');
        res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
        return;
    }

    const userDetails = sessions[sid];
    const productId = parseInt(req.body.productId);
    const quantity = parseInt(req.body.quantity);

    addToCart(userDetails, productId, quantity);

    res.status(200).json(fetchCart(sessions[sid]));
});

app.post('/checkout', express.json(), (req, res) => {
    const sid = req.cookies.sid;

    if (!sid) {
        res.status(401).json({ code: 'LOGIN_REQUIRED' });
        return;
    }

    if (!sessions[sid]) {
        res.clearCookie('sid');
        res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
        return;
    }

    const username = sessions[sid];

    const cart = fetchCart(username);

    addOrder(username, cart);
    clearCart(username);

    res.status(200).json(fetchOrders(sessions[sid]));
});

app.get('/orders', express.json(), (req, res) => {
    const sid = req.cookies.sid;

    if (!sid) {
        res.status(401).json({ code: 'LOGIN_REQUIRED' });
        return;
    }

    if (!sessions[sid]) {
        res.clearCookie('sid');
        res.status(403).json({ code: 'LOGIN_UNAUTHORIZED' });
        return;
    }

    res.status(200).json(fetchOrders(sessions[sid]));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));