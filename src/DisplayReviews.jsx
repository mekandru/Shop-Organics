import React, { useContext, useEffect } from 'react';
import './displayReviews.css';
import { ErrorContext, ProductContext } from './storeContext';
import reviewUtil from './storeUtil';

const DisplayReviews = ({ productId }) => {
    const { error, setError } = useContext(ErrorContext);
    const { products, setProducts } = useContext(ProductContext);

    useEffect(() => {
        setError('');
    }, []);

    const renderAllReviews = () => {
        return (
            <div>
                {
                    products[productId]['reviews'].map((value, index) => {
                        return renderEachReview(index);
                    })}
            </div>
        )
    }

    const renderStarRatings = (rating) => {
        const ratingDisplay = reviewUtil.buildRatingDisplayArray(rating);
        return ratingDisplay.map((value, index) => {
            return (<span className="star-rating">{value === 1 ? "★" : "☆"}</span>)
        });
    }

    const renderEachReview = (reviewIndex) => {
        return (<div key={reviewIndex} className="individual-review">
            <div className="reviewer-name"> {products[productId]['reviews'][reviewIndex]['username']}</div>
            {products[productId]['reviews'][reviewIndex]['rating'] &&
                renderStarRatings(products[productId]['reviews'][reviewIndex]['rating'])
            }
            {products[productId]['reviews'][reviewIndex]['text'] && <div>{products[productId]['reviews'][reviewIndex]['text']}</div>}
            <div className="review-time">{products[productId]['reviews'][reviewIndex]['reviewTime']}</div>
        </div >
        );
    }

    return (
        <div>
            <b>REVIEWS</b>
            {renderAllReviews()}
        </div>
    );
};

export default DisplayReviews;