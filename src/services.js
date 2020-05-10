export const fetchLoginStatus = (username) => {
    return fetch('/session', {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ code: 'NETWORK_ERROR' });
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 500 || response.status === 503) {
                    return Promise.reject({ code: 'SERVER_CONNECTION' });
                }

                return response.json().then(result => Promise.reject(result));
            }

            return response.json();
        });
};

export const sendLogin = (username, password) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username, password }),
    })
        .catch(() => {
            return Promise.reject({ code: 'NETWORK_ERROR' });
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 500 || response.status === 503) {
                    return Promise.reject({ code: 'SERVER_CONNECTION' });
                }

                return response.json().then(result => Promise.reject(result));
            }

            return response.json();
        });
};

export const logoutUser = () => {
    return fetch('/session', {
        method: 'DELETE',
    })
        .catch(() => {
            return Promise.reject({ code: 'NETWORK_ERROR' });
        })
        .then(response => {
            return response.ok;
        });
};

export const fetchProducts = () => {
    return fetch('/products/', {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ code: 'NETWORK_ERROR' });
        })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500 || response.status === 503) {
                    return Promise.reject({ code: 'SERVER_CONNECTION' });
                }

                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};

export const fetchCart = () => {
    return fetch('/cart/', {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ code: 'NETWORK_ERROR' });
        })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500 || response.status === 503) {
                    return Promise.reject({ code: 'SERVER_CONNECTION' });
                }

                return response.json().then(result => Promise.reject(result));
            }

            return response.json();
        });
};

export const fetchOrders = () => {
    return fetch('/orders/', {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ code: 'NETWORK_ERROR' });
        })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500 || response.status === 503) {
                    return Promise.reject({ code: 'SERVER_CONNECTION' });
                }

                return response.json().then(result => Promise.reject(result));
            }

            return response.json();
        });
};

export const addReview = (rating, text, productId) => {
    return fetch('/review', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ rating, text, productId }),
    })
        .catch(() => {
            return Promise.reject({ code: 'NETWORK_ERROR' });
        })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500 || response.status === 503) {
                    return Promise.reject({ code: 'SERVER_CONNECTION' });
                }

                return response.json().then(result => Promise.reject(result));
            }

            return response.json();
        });
};

export const addToCart = (productId, quantity) => {
    return fetch('/cart', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ productId, quantity }),
    })
        .catch(() => {
            return Promise.reject({ code: 'NETWORK_ERROR' });
        })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500 || response.status === 503) {
                    return Promise.reject({ code: 'SERVER_CONNECTION' });
                }

                return response.json().then(result => Promise.reject(result));
            }

            return response.json();
        });
};

export const performCheckout = () => {
    return fetch('/checkout', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        })
    })
        .catch(() => {
            return Promise.reject({ code: 'NETWORK_ERROR' });
        })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500 || response.status === 503) {
                    return Promise.reject({ code: 'SERVER_CONNECTION' });
                }

                return response.json().then(result => Promise.reject(result));
            }

            return response.json();
        });
};


