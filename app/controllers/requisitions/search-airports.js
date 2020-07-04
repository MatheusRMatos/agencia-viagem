var request = require("request");

var options = {
    method: 'GET',
    url: 'https://tripadvisor1.p.rapidapi.com/airports/search',
    qs: {
        locale: 'en_US',
        query: 'new york'
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