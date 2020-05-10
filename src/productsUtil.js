import reviewUtil from './storeUtil';

export const methods = {
    nameAscending: 'Name (A-Z)',
    nameDescending: 'Name (Z-A)',
    priceAscending: 'Price (Low to High)',
    priceDescending: 'Price (High to Low)',
    AverageRatingDescending: 'Average Rating (High to Low)'
};

export const sortProducts = ({ by, list }) => {
    const elementsArray = Object.keys(list).map(function (key) {
        return [key, list[key]];
    });

    if (by === 'nameDescending') {
        return [...elementsArray].sort((a, b) => a[1]['name'] >= b[1]['name'] ? -1 : 1);
    } else if (by === 'priceDescending') {
        return [...elementsArray].sort((a, b) => a[1]['price'] >= b[1]['price'] ? -1 : 1);
    } else if (by === 'priceAscending') {
        return [...elementsArray].sort((a, b) => a[1]['price'] >= b[1]['price'] ? 1 : -1);
    } else if (by === 'AverageRatingDescending') {
        return [...elementsArray].sort((a, b) => reviewUtil.averageProductRating(list[a[0]]) >=
            reviewUtil.averageProductRating(list[b[0]]) ? -1 : 1);
    }

    return [...elementsArray].sort((a, b) => a[1]['name'] >= b[1]['name'] ? 1 : -1);
};

export const buildFilteredProducts = (list, searchString) => {
    if (!searchString || searchString.trim().length === 0) {
        return list;
    }

    let filteredProducts = Object.keys(list).reduce(function (filteredProducts, key) {
        if (list[key]['name'].toLowerCase().includes(searchString.toLowerCase())) {
            filteredProducts[key] = list[key];
        }

        return filteredProducts;
    }, {});

    return filteredProducts;
}
