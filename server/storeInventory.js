const products = {
    1: {
        name: 'Organic Apple Chips, 2.7oz',
        price: 7,
        details: 'High quality crispy baked cinnamon apple chips',
        image: '/chips.jpg',
        reviews: [
            {
                username: 'meghana',
                rating: 5,
                text: 'top quality apples',
                reviewTime: new Date().toLocaleString()
            },
            {
                username: 'nischel',
                rating: 5,
                text: 'fresh apple chips',
                reviewTime: new Date().toLocaleString()
            }
        ]
    },
    2:
    {
        name: 'Farm Connect Organic Paneer, 200g',
        price: 12,
        details: 'Gluten Free Paneer with no chemicals, no adulterants, no preservatives and no artificial ingredients are added while preparing',
        image: '/paneer.jpeg',
        reviews: [
            {
                username: 'Sophia',
                rating: 5,
                text: 'Excellent Creamy and tasty paneer',
                reviewTime: new Date().toLocaleString()
            },
            {
                username: 'nischel',
                rating: 4,
                text: 'fresh paneer from Shop Organics is my favourite',
                reviewTime: new Date().toLocaleString()
            }

        ]

    },
    3: {
        name: 'Organic Pine Apple, 1 lb',
        price: 4,
        details: 'High quality freshly grown organic pine apples ',
        image: '/pine_apple.jpg',
        reviews: [
            {
                username: 'meghana',
                rating: 5,
                text: 'love the quality of food from shop organics',
                reviewTime: new Date().toLocaleString()
            },
            {
                username: 'nischel',
                rating: 4,
                text: 'fresh Tomatoes',
                reviewTime: new Date().toLocaleString()
            }

        ]
    },
    4: {
        name: 'Organic Potatoes, 1 lb',
        price: 5,
        details: 'High quality freshly grown organic potatoes ',
        image: '/potato.jpg',
        reviews: [
            {
                username: 'meghana',
                rating: 5,
                text: 'love the quality of food from shop organics',
                reviewTime: new Date().toLocaleString()
            },
            {
                username: 'nischel',
                rating: 4,
                text: 'fresh potatoes',
                reviewTime: new Date().toLocaleString()
            }

        ]
    },
    5: {
        name: 'Christina Moss Naturals Organic Face Wash, 118ml',
        price: 6,
        details: 'Handcrafted Formula with all naturals ingredients',
        image: '/facewash.jpg',
        reviews: [
            {
                username: 'meghana',
                rating: 5,
                text: 'Gives refreshing feeling within single use',
                reviewTime: new Date().toLocaleString()
            },
            {
                username: 'Jim',
                rating: 4,
                text: 'Experienced a cooling effect',
                reviewTime: new Date().toLocaleString()
            }

        ]
    },
    6: {
        name: 'Alter Eco Deep Dark Salted Burnt Caramel Organic Chocolate, 2.82oz',
        price: 6,
        details: 'Finger licking  rich buttery crunch dark chocolate made with 70% cocoa is gluten free and made with organic ingredients',
        image: '/chocolate.jpg',
        reviews: [
            {
                username: 'meghana',
                rating: 5,
                text: 'love the quality of chocolates from shop organics',
                reviewTime: new Date().toLocaleString()
            },
            {
                username: 'deepthi',
                rating: 4,
                text: 'simply delicious',
                reviewTime: new Date().toLocaleString()
            }

        ]
    },
    7: {
        name: 'Wellsley Farms Organic whole grain Quinoa, 3lbs',
        price: 9,
        details: 'A good source of protein, iron and dietary fibre quinoa',
        image: '/quinoa.jpg',
        reviews: [
            {
                username: 'alexa',
                rating: 5,
                text: 'love the quality of food from shop organics',
                reviewTime: new Date().toLocaleString()
            },
            {
                username: 'siri',
                rating: 3,
                text: 'tastes good',
                reviewTime: new Date().toLocaleString()
            }

        ]
    },
    8: {
        name: 'Organic Ragi Flour, 2 lb',
        price: 14,
        details: 'High quality flour, simply amazing',
        image: '/ragi.jpg',
        reviews: [
            {
                username: 'Ram',
                rating: 5,
                text: 'top quality ragi mix',
                reviewTime: new Date().toLocaleString()
            },
            {
                username: 'Sid',
                rating: 3,
                text: 'good product',
                reviewTime: new Date().toLocaleString()
            }

        ]
    },
    9: {
        name: 'Pyure Organic Stevia, 16 oz',
        price: 10,
        details: 'Organic stevia blend, granular all-purpose sweetner',
        image: '/stevia.jpeg',
        reviews: [
            {
                username: 'Mark',
                rating: 5,
                text: 'Perfect sweetner for fitness freaks',
                reviewTime: new Date().toLocaleString()
            },
            {
                username: 'Steve',
                rating: 5,
                text: 'Sweetner I use everyday without any guilt',
                reviewTime: new Date().toLocaleString()
            }
        ]
    }
};

const addReview = (productId, userDetails, ratingDetails, reviewText) => {
    const reviewDetails = {};
    reviewDetails['username'] = userDetails;

    if (ratingDetails) {
        reviewDetails['rating'] = ratingDetails;
    }

    if (reviewText && reviewText.length != 0) {
        reviewDetails['text'] = reviewText;
    }

    reviewDetails['reviewTime'] = new Date().toLocaleString();

    products[productId]['reviews'].push(reviewDetails);
}

module.exports = {
    products,
    addReview
};