const axios = require("axios");

module.exports = {
    async pesquisaCidade(id_uf, id_cid) {
        let data;
        var cidade;
        try {
            data = await axios({
                "method": "GET",
                "url": "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + id_uf + "/municipios"
            });
            var cidades = data.data;
            for (i = 0; i < cidades.length; i++) {
                if (id_cid == i) {
                    cidade = data.data[i].nome;
                }
            }
        } catch (erro) {
            console.log(erro);
        }
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(cidade);
            }, 1000);
        });
    }
}


/*
pesquisaCidade(12, 3).then(v => {
    console.log("resultado: ",v);
});
*/





/*
const axios = require("axios");
var cidade;

module.exports = {
    cidade,
    processaDados(data, id_cid) {
        var cidades = data.data;
        for (i = 0; i < cidades.length; i++) {
            if (id_cid == i) {
                cidade = data.data[i].nome;
            }
        }
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(cidade);
            }, 1000);
        });
    },

    async pesquisaCidade(id_uf, id_cid) {
        let data;
        try {
            data = await axios({
                "method": "GET",
                "url": "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + id_uf + "/municipios"
            });
        } catch (erro) {
            console.log(erro);
        }
        return processaDados(data, id_cid);
    }
}

*/
/*
pesquisaCidade(12, 3).then(v => {
    console.log("resultado: ",v);
});
*/