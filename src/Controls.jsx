import React from 'react';
import { methods } from './productsUtil';
import './controls.css';

const Controls = ({
    sortBy,
    setSortBy
}) => {

    const buttons = Object.keys(methods).map(method => (
        <option
            key={method}
            className={method === sortBy ? 'active' : ''}
            value={method}>
            {methods[method]}
        </option >
    ));

    return (
        <div className="controls">
            <label htmlFor="products-sort">Sort by: </label>
            <select className="products-sort" onChange={(e) => {
                setSortBy(e.target.value);
            }}>
                {buttons}
            </select>
        </div>
    );
};

export default Controls;