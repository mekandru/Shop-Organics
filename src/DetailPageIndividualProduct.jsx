import React, { useContext, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import AddToCart from './AddToCart';
import './detailPageIndividualProduct.css';
import ProductReviews from './ProductReviews';
import { ErrorContext, ProductContext, UserContext } from './storeContext';

const DetailPageIndividualProduct = () => {
    const { userState, setUserState } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const { products, setProducts } = useContext(ProductContext);
    const [productId, setProductId] = useState(useParams()['id']);

    const detailProductDisplay = () => {
        if (products && products[productId]) {
            return (
                <div className="product-description">
                    <div className="product-details">
                        <img className="display-product" src={products[productId]['image']} alt={products[productId]['name']} />
                        <div className="product-attributes">
                            <div><b>{products[productId]['name']}</b></div>
                            <div>Price: $ {products[productId]['price']}</div>
                            <div>{products[productId]['details']}</div>
                            <AddToCart productId={productId} />
                        </div>
                    </div>
                    <hr />
                    <ProductReviews productId={productId} />
                </div>
            );
        }
    }

    return (
        <div>
            {
                detailProductDisplay()
            }
        </div >
    );
};

export default withRouter(DetailPageIndividualProduct);