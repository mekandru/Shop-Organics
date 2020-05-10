import React, { useContext } from 'react';
import OrdersPageIndividualOrder from './OrdersPageIndividualOrder';
import { OrderContext } from './storeContext';

const MyOrders = () => {
    const { orders, setOrders } = useContext(OrderContext);

    return (
        <div>
            <p><b>My Orders:</b></p>
            {orders && orders.length > 0 &&
                (<div>
                    {orders.map((value, index) => {
                        return (
                            <OrdersPageIndividualOrder orderDetails={value['orderDetails']} orderTime={value['orderTime']} />
                        )
                    })}
                </div>)
            }
            {(!orders || orders.length === 0) && <p>You dont have any orders yet</p>}
        </div >
    );
};

export default MyOrders;