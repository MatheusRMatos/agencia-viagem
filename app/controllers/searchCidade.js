var request = require("request");

module.exports = {
    pesquisaCidade(id_uf, id_cid) {
        var cidade;
        var options = {
            method: 'GET',
            url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + id_uf + "/municipios",
            qs: {
                currency: 'USD',
                ta: '1',
                c: '0',
                d1: 'CNX',
                o1: 'DMK',
                dd1: '<required>'
            },
            headers: {
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key': '741236ac5bmshf9df7b3f7a114eap1bb7cejsn006f51b93c56',
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                throw new Error(error);
            }

            var texto = body;
            const regex = /({[\x20-\x7Cáàãâéèêìíîóòõôúùûçñ\x7E]*}}}}})/g;
            var resultados = texto.match(regex);

            for (i = 0; i < resultados.length; i++) {
                var json = resultados[i];
                var obj = JSON.parse(json);
                resultados[i] = obj;
            }

            for (i = 0; i < resultados.length; i++) {
                if (id_cid == i) {
                    cidade = resultados[i].nome;
                }
            }
            console.log("Cidade é: " + cidade);
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(cidade);
                }, 1000);
            });
        });
    }
}