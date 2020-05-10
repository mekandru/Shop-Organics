import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './storeContext';
import storeUtil from './storeUtil';

const OrdersPageIndividualOrder = ({ orderDetails, orderTime }) => {
    const { products, setProducts } = useContext(ProductContext);

    return (
        <div>
            <p>You placed this order at {orderTime}</p>
            {Object.keys(orderDetails).map((value, index) => {
                return (
                    <div>
                        <Link to={"/product/" + value}><span>{products[value]['name']}</span></Link>
                        <br />
                        <br />
                        <div> Quantity: {orderDetails[value]} </div>
                        <br />
                    </div>
                )
            })}
            <p><b>Total: </b>$ {storeUtil.totalEntityValue(orderDetails, products)}</p>
        </div >
    );
};

export default OrdersPageIndividualOrder;