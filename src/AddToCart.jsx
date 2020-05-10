import React, { useContext, useState } from 'react';
import './addToCart.css';
import errorMessages from './errorMessages';
import { addToCart } from './services';
import { CartContext, ErrorContext, UserContext } from './storeContext';

const AddToCart = ({ productId }) => {
    const [successMessage, setSuccessMessage] = useState('');
    const { cart, setCart } = useContext(CartContext);
    const { error, setError } = useContext(ErrorContext);
    const { userState, setUserState } = useContext(UserContext);

    const initializeQuantity = () => {
        if (cart[productId]) {
            return cart[productId];
        }

        return 1;
    }

    const [quantity, setQuantity] = useState(initializeQuantity());

    const submitToCart = () => {
        addToCart(productId, quantity)
            .then((latestCart) => {
                setSuccessMessage('Your cart has been successfully updated');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 1500);

                setCart(latestCart);
                setQuantity(latestCart[productId]);
                setError('');
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
        < div  >
            <p>{successMessage}</p>
            <div className="add-product-to-cart">
                <form>
                    <select className="quantity" onChange={(e) => setQuantity(e.target.value)}>
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
                    <input className="add-to-cart" type="button" value="Add to cart" onClick={submitToCart} />
                </form>
            </div>
        </div >
    );
};

export default AddToCart;