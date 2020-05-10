import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CartPage from './CartPage';
import DetailPageIndividualProduct from './DetailPageIndividualProduct';
import errorMessages from './errorMessages';
import HomePageAllProducts from './HomePageAllProducts';
import MyOrders from './MyOrders';
import { fetchCart, fetchOrders, fetchProducts } from './services';
import { CartContext, ErrorContext, OrderContext, ProductContext, UserContext } from './storeContext';

const Store = () => {
    const { error, setError } = useContext(ErrorContext);
    const [products, setProducts] = useState({});
    const [cart, setCart] = useState({});
    const [orders, setOrders] = useState([]);
    const { userState, setUserState } = useContext(UserContext);

    useEffect(() => {
        setError('');

        fetchProducts()
            .then((productsList) => {
                setProducts(productsList);
            })
            .catch((err) => {
                setError(errorMessages[err.code || 'DEFAULT']);
                setTimeout(() => {
                    if (err.code === 'LOGIN_REQUIRED' || err.code === 'LOGIN_UNAUTHORIZED' || err.code === 'SERVER_CONNECTION') {
                        setUserState({
                            isLoggedIn: false
                        });
                    }
                }, 2500);
            });

        fetchCart()
            .then((cart) => {
                setCart(cart);
            })
            .catch((err) => {
                setError(errorMessages[err.code || 'DEFAULT']);
                setTimeout(() => {
                    if (err.code === 'LOGIN_REQUIRED' || err.code === 'LOGIN_UNAUTHORIZED' || err.code === 'SERVER_CONNECTION') {
                        setUserState({
                            isLoggedIn: false
                        });
                    }
                }, 2500);
            });

        fetchOrders()
            .then((orders) => {
                setOrders(orders);
            })
            .catch((err) => {
                setError(errorMessages[err.code || 'DEFAULT']);
                setTimeout(() => {
                    if (err.code === 'LOGIN_REQUIRED' || err.code === 'LOGIN_UNAUTHORIZED' || err.code === 'SERVER_CONNECTION') {
                        setUserState({
                            isLoggedIn: false
                        });
                    }
                }, 2500);
            });
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            <CartContext.Provider value={{ cart, setCart }}>
                <OrderContext.Provider value={{ orders, setOrders }}>
                    <div>
                        <Switch>
                            <Route exact path="/" component={HomePageAllProducts} />
                            <Route exact path="/product/:id" component={DetailPageIndividualProduct} />
                            <Route exact path="/mycart/" component={CartPage} />
                            <Route exact path="/myorders/" component={MyOrders} />
                        </Switch>
                    </div>
                </OrderContext.Provider>
            </CartContext.Provider>
        </ProductContext.Provider >
    );
};

export default withRouter(Store);