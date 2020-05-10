import React from 'react';
import AddReview from './AddReview';
import DisplayReviews from './DisplayReviews';

const ProductReviews = ({ productId }) => {
    return (
        <div className="individual-product-reviews">
            <DisplayReviews productId={productId} />
            <AddReview productId={productId} />
        </div>
    );
};

export default ProductReviews;