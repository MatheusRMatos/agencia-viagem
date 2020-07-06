var request = require("request");

module.exports = {
    encontraSessao(data_orig, code_air_orig, code_air_dest, data_dest, PMaiores, PMenores, classe) {
        var options = {
            method: 'GET',
            url: 'https://tripadvisor1.p.rapidapi.com/flights/create-session',
            qs: {
                currency: 'USD',
                ta: PMaiores,
                tc: PMenores,
                c: classe,
                d1: code_air_dest,
                o1: code_air_orig,
                dd1: data_orig
            },
            headers: {
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key': '741236ac5bmshf9df7b3f7a114eap1bb7cejsn006f51b93c56',
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(data);
                }, 1000);
            });
        });
    }
}
