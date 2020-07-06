var request = require("request");

var options = {
    method: 'GET',
    url: 'https://tripadvisor1.p.rapidapi.com/hotels/list',
    qs: {
        offset: '0',
        currency: 'USD',
        limit: '30',
        order: 'asc',
        lang: 'en_US',
        sort: 'recommended',
        location_id: '293919',
        adults: '1',
        checkin: '<required>',
        rooms: '1',
        nights: '2'
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