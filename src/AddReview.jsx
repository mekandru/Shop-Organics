import React, { useContext, useState } from 'react';
import errorMessages from './errorMessages';
import { addReview } from './services';
import { ErrorContext, ProductContext, UserContext } from './storeContext';
import './addReview.css';

const AddReview = ({ productId }) => {
    const [rating, setRating] = useState(3);
    const [reviewText, setReviewText] = useState('');
    const { products, setProducts } = useContext(ProductContext);
    const { error, setError } = useContext(ErrorContext);
    const { userState, setUserState } = useContext(UserContext);

    const submitReview = () => {
        addReview(rating, reviewText, productId)
            .then((currentProducts) => {
                setProducts(currentProducts);
                setError('');
                setRating(3);
                setReviewText('');
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

                setRating(3);
                setReviewText('');
            });
    }

    return (
        <div className="add-product-review">
            <form>
                <br />
                <span> Add Product Rating :  </span>
                <select className="review-selection" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />
                <br />
                <textarea className="review-area" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Enter review" />
                <br />
                <br />
                <input className="add-review" type="button" value="Add Review" onClick={submitReview} />
            </form>
        </div>
    );
};

export default AddReview;