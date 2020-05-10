import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './homePageIndividualProduct.css';
import { ErrorContext, ProductContext, UserContext } from './storeContext';
import reviewUtil from './storeUtil';

const HomePageIndividualProduct = ({ productId }) => {
    const { userState, setUserState } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const { products, setProducts } = useContext(ProductContext);

    useEffect(() => {
        setError('');
    }, []);

    return (
        <div key={productId} className="individual-homepage-product">
            <Link className="product-label" to={"/product/" + productId}>
                <div className="image-container">
                    <Link to={"/product/" + productId}>
                        <img className="display-product" src={products[productId]['image']} alt={products[productId]['name']} />
                    </Link>
                </div>
                <br />
                <div className="product-content">
                    <span>{products[productId]['name']}</span>
                    <div className="product-details">
                        <div> Price: ${products[productId]['price']} </div>
                        <div className="item-rating"> Average Rating: {reviewUtil.averageProductRating(products[productId])} /5 </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default withRouter(HomePageIndividualProduct);