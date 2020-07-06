var request = require("request");

var options = {
    method: 'GET',
    url: 'https://tripadvisor1.p.rapidapi.com/hotel-filters/list',
    qs: {
        subcategory: 'hotel%2Cbb%2Cspecialty',
        lang: 'en_US',
        currency: 'USD',
        nights: '4',
        zff: '4%2C6',
        hotel_class: '1%2C2%2C3',
        order: 'asc',
        checkin: '2020-01-08',
        amenities: 'beach%2Cbar_lounge%2Cairport_transportation',
        sort: 'recommended',
        child_rm_ages: '7%2C11',
        adults: '1',
        rooms: '1',
        location_id: '293919'
    },
    headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': '741236ac5bmshf9df7b3f7a114eap1bb7cejsn006f51b93c56',
        useQueryString: true
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});