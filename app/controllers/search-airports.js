/* DADA UMA CIDADE RETORNA O CÓDIGO DE UM AÉROPORTO */
var request = require("request");

module.exports = {
    encontraAeroporto(cidade) {
        var options = {
            method: 'GET',
            url: 'https://tripadvisor1.p.rapidapi.com/airports/search',
            qs: {
                locale: 'pt_BR',
                query: cidade
            },
            headers: {
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key': '741236ac5bmshf9df7b3f7a114eap1bb7cejsn006f51b93c56',
                useQueryString: true
            }
        };

        request(options, function (error, response, data) {
            if (error) {
                throw new Error(error);
                console.log("Não foi possível encontrar um aeroporto disponível nesta cidade.")
            }
           return new Promise(resolve => {
               setTimeout(() => {
                   resolve(data);
               }, 1000);
           });
        });
    }
}

