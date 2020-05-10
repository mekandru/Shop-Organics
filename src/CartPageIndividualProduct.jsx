import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import errorMessages from './errorMessages';
import { addToCart } from './services';
import { CartContext, ErrorContext, ProductContext, UserContext } from './storeContext';
import './cartPageIndividualProduct.css';

const CartPageIndividualProduct = ({ productId }) => {
    const { userState, setUserState } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const { products, setProducts } = useContext(ProductContext);
    const { cart, setCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(cart[productId]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        submitToCart();
    }, [quantity]);

    const submitToCart = () => {
        addToCart(productId, quantity)
            .then((latestCart) => {
                setCart(latestCart);
                setQuantity(latestCart[productId]);
                setError('');
                setSuccessMessage('Your cart has been successfully updated');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 1500);
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
    }

    return (
        <div>
            <div>
                <p>{successMessage}</p>
                <Link to={"/product/" + productId}><div>{products[productId]['name']}</div></Link>
                <div>
                    <br />
                    Quantity : <select className="quantity-variation" onChange={(e) => setQuantity(e.target.value)}>
                        <option value="0" selected={cart[productId] === 0 ? true : false}>0</option>
                        <option value="1" selected={cart[productId] === 1 ? true : false}>1</option>
                        <option value="2" selected={cart[productId] === 2 ? true : false}>2</option>
                        <option value="3" selected={cart[productId] === 3 ? true : false}>3</option>
                        <option value="4" selected={cart[productId] === 4 ? true : false}>4</option>
                        <option value="5" selected={cart[productId] === 5 ? true : false}>5</option>
                        <option value="6" selected={cart[productId] === 6 ? true : false}>6</option>
                        <option value="7" selected={cart[productId] === 7 ? true : false}>7</option>
                        <option value="8" selected={cart[productId] === 8 ? true : false}>8</option>
                        <option value="9" selected={cart[productId] === 9 ? true : false}>9</option>
                        <option value="10" selected={cart[productId] === 10 ? true : false}>10</option>
                    </select>
                </div>
            </div>
        </div >
    );
};

export default CartPageIndividualProduct;