import React, { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import CartPageIndividualProduct from './CartPageIndividualProduct';
import errorMessages from './errorMessages';
import { performCheckout } from './services';
import { CartContext, ErrorContext, OrderContext, ProductContext, UserContext } from './storeContext';
import storeUtil from './storeUtil';
import './cartPage.css';

const CartPage = () => {
    const { cart, setCart } = useContext(CartContext);
    const { orders, setOrders } = useContext(OrderContext);
    const { error, setError } = useContext(ErrorContext);
    const { products, setProducts } = useContext(ProductContext);
    const [successMessage, setSuccessMessage] = useState('');
    const { userState, setUserState } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        setError('');
    }, []);

    const submitCheckout = () => {
        performCheckout()
            .then((orders) => {
                setCart({});
                setSuccessMessage('Your order has been successfully placed');
                setTimeout(() => {
                    setSuccessMessage('');
                    history.push("/");
                }, 1500);
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
    };

    return (
        <div>
            <p>{successMessage}</p>
            {Object.keys(cart).length > 0 &&
                (<div>
                    {Object.keys(cart).map((value, index) => {
                        return (
                            <CartPageIndividualProduct productId={value} />
                        )
                    })}
                    <p><b>Total:</b> ${storeUtil.totalEntityValue(cart, products)}</p>
                    <input className="checkout" type="button" value="Checkout" onClick={submitCheckout} />
                </div>)
            }

            {successMessage.length === 0 && Object.keys(cart).length === 0 && <p>Your cart is empty</p>}
        </div >
    );
};

export default withRouter(CartPage);