var request = require("request");

module.exports = {
    poll_flight(sid, mc, ma, n, ns, so) {
        var options = {
            method: 'GET',
            url: 'https://tripadvisor1.p.rapidapi.com/flights/poll',
            qs: {
                currency: 'USD',
                n: '15',
                ns: 'NON_STOP%2CONE_STOP',
                so: 'PRICE',
                o: '0'
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
    }
}
