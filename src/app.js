import {
    hotelBox, errorBox, reviewBox
}
from './templates';

import style from './scss/main.scss';

// method for fetching hotels
const _getHotels = () => {
    if ($('.api_error') !== null) $('.api_error').remove();
    let url = 'https://fake-hotel-api.herokuapp.com/api/hotels?count=5';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const hotels = data.reduce((list, hotel) => {
                const {
                    id,
                    name,
                    description,
                    date_start,
                    date_end,
                    price,
                    rating,
                    stars,
                    city,
                    country,
                    images
                } = hotel;
                list += hotelBox(id, name, description, date_start, date_end, price, rating, stars, city, country, images);
                return list;
            }, '');
            $(".hotel_list").html(hotels);
            $(".load_reviews").on('click', e => {
                let id = $(e.target).data().hotelId;
                if ($(`#review_${id}`).hasClass('in')) {
                    $(`#review_${id}`).collapse('hide');
                    $(`#loader_${id}`).html('Show Reviews')
                } else {
                    _getReviews(id);
                    $(`#loader_${id}`).html('Hide Reviews')
                }

            });
        })
        .catch(error => {
            console.log(error);
            const alert = errorBox();
            $(".hotel_list").html(alert);
        })
};

// method for checking last index
const isLast = (index, len) => true ? len - 1 == index : false;

// method for fetching reviews
const _getReviews = id => {
    let url = `https://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const reviews = data.reduce((list, review, index) => {
                const {
                    name,
                    comment,
                    positive
                } = review;
                list += reviewBox(name, comment, positive, isLast(index, data.length));
                return list;
            }, '')
            console.log(reviews);;
            $(`#review_${id}`).html(reviews);
            $(`#review_${id}`).collapse('show');
        })
        .catch(error => error)
};

// the start of the awesome
$('.load_hotels').on('click', e => {
    e.preventDefault();
    _getHotels();
});