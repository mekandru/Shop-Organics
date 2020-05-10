const averageProductRating = (product) => {
    let ratingSum = 0.0;
    let ratingCount = 0;
    const reviews = product['reviews'];

    for (let index = 0; index < reviews.length; index++) {
        if (reviews[index]['rating']) {
            ratingSum += reviews[index]['rating'];
            ratingCount++;
        }
    }
    return (Math.round((ratingSum / ratingCount) * 10) / 10);
};

const buildRatingDisplayArray = (rating) => {
    const ratingDisplay = [];

    for (let i = 0; i < rating; i++) {
        ratingDisplay.push(1);
    }

    for (let j = 0; j < 5 - rating; j++) {
        ratingDisplay.push(0);
    }

    return ratingDisplay;
}

const totalEntityValue = (entity, products) => {
    let totalValue = 0;
    Object.keys(entity).forEach(element => {
        totalValue += (products[element]['price'] * entity[element]);
    });

    return totalValue;
}

export default { averageProductRating, buildRatingDisplayArray, totalEntityValue };