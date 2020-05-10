import React, { useContext, useEffect } from 'react';
import './homePageAllProducts.css';
import HomePageIndividualProduct from './HomePageIndividualProduct';
import { ErrorContext, ProductContext, UserContext } from './storeContext';
import { useState } from 'react';
import Controls from './Controls';
import { sortProducts, buildFilteredProducts } from './productsUtil';

const HomePageAllProducts = () => {
    const { userState, setUserState } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const { products, setProducts } = useContext(ProductContext);
    const [sortBy, setSortBy] = useState('');
    const [productSearchString, setProductSearchString] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        setFilteredProducts(products);
        setError('');
    }, []);

    useEffect(() => {
        setFilteredProducts(buildFilteredProducts(products, productSearchString));
    }, [productSearchString]);

    const renderAllProducts = () => {
        const sortedProducts =
            (!productSearchString || productSearchString.trim().length === 0) &&
                Object.keys(filteredProducts).length === 0 ? sortProducts({ by: sortBy, list: products }) :
                sortProducts({ by: sortBy, list: filteredProducts });

        return (sortedProducts.map((value, index) => {
            return (
                <HomePageIndividualProduct productId={value[0]} />
            )
        }));
    }

    return (
        <div className="overall-container">
            <div className="username-homepage">Welcome <i><span className="user"> {userState.username}, </span></i> grab them while they are fresh!</div>
            <div className="filter-actions">
                <input value={productSearchString} className="products-search"
                    onChange={(e) => setProductSearchString(e.target.value)} placeholder="Search products...🔍" />
                <Controls sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <div className="product-container">
                {renderAllProducts()}
            </div>
        </div >
    );
};

export default HomePageAllProducts;