
const hotelBox = (id, name, description, date_start, date_end, price, rating, stars, city, country, images) => {
    
    // converting datetime to german format - helper function
    const starting_date = convertGermanTime(date_start)
    const ending_date = convertGermanTime(date_end)
    // selects a random image from the images array
    const last_index = images.length - 1;
    const image = Math.floor(Math.random() * ((last_index - images[0]) + 1) + images[0]);
    // creates stars equal to the value of stars' digit
    let ratings = '';
    for (let i = 0; i < stars; i += 1) {
        ratings += '<i class="fa fa-star"></i>';
    }

    return `
      <div class="hotelBox" id="hotel_${id}">
        <div class="row">
          <div class="col-lg-4 no-pad">
            <div class="hotel_image">
                <img src="${images}" class="img-fluid h_image" alt="hotel">
            </div>
        </div>
        <div class="col-lg-8 no-pad">
            <div class="hotel_details">
                <div class="row">
                    <div class="col-lg-9 ">
                        <div class="row">
                            <div class="col-lg-12 ">
                               <h3 class="h_name float-left">

                                  ${name}

                                </h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 "> 
                              <span class="h_location float-left">

                                ${city} - ${country}

                              </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 "> 
                      <span class="h_rating float-right">

                        ${ratings}

                      </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 ">
                        <p class="h_description float-left">${description}</p>
                    </div>
                </div>
            </div>
            <div class="hotel_details">
                <div class="row">
                    <div class="col-lg-5 ">
                        <button class="btn btn-secondary load_reviews" type="button" data-toggle="collapse" 
                        data-target="#review_${id}"
                        id="loader_${id}"
                        data-hotel-id="${id}"
                        aria-expanded="false" aria-controls="#review_${id}"
                        >Show Reviews</button>
                    </div>
                    <div class="col-lg-7 ">
                        <div class="row">
                            <div class="col-lg-12 ">
                                 <h3 class="h_price float-right">

                                    ${price}&#xA0;&#x20AC;

                                  </h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 "> 
                                <span class="h_dates float-right">

                                  ${starting_date}&#xA0;-&#xA0;${ending_date}

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12 hotel_reviews no-pad">
            <div id="review_${id}" class="reviewBox collapse col-lg-12"></div>
        </div>
    </div>
</div>
  `
};

const reviewBox = (name, comment, positive, last_review) => {
    const type = positive ? '<i class="fa fa-plus-circle positive"></i>' : '<i class="fa fa-minus-circle negative"></i>'
    const separator = last_review == true ? '' : '<hr>'
    return `
        <div class="row">
            <div class="col-lg-1"> 
              <span class="c_type float-right">

                  ${type}

              </span>
            </div>
            <div class="col-lg-11">
                <div class="row">
                    <div class="col-lg-12"> <span class="commenter float-left">

                        ${name}

                      </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <p class="comment">${comment}</p>
                    </div>
                </div>
            </div>
        </div>
      ${separator}
    `
};

// converting datetime to german format - helper function
const convertGermanTime = (date) => {
  return new Date(date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

const errorBox = () => {
    return `
    <div class="alert alert-danger text-center" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&#xD7;</span>
    </button>An error occured</div>
    `
}

export {
    hotelBox,
    errorBox,
    reviewBox
}