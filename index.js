const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

const search_airports = require('./app/controllers/search-airports');
const pesquisa_cidade = require('./app/controllers/pesquisaCidade');

//Config


// Template Engine
app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname + '/app/views'));


// Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Public
app.use(express.static(path.join(__dirname + '/app/public')));

// Rotas

app.get('/', (req, res) => {
    res.render('layouts/search');
});

app.get('/criar-conta', (req, res) => {
    res.render('layouts/criar-conta');
});

app.get('/pacotes', (req, res) => {
    res.render('layouts/search');

});

app.post('/pacotes', (req, res) => {
    res.render('layouts/search');
    var id_estado_origem = req.body.idEstadoOrigem;
    var id_cidade_origem = req.body.idCidadeOrigem;
    var id_estado_destino = req.body.idEstadoDestino;
    var id_cidade_destino = req.body.idCidadeDestino;
    var data_origem = req.body.dataOrigem;
    var data_destino = req.body.dataDestino;
    var hospedes_maiores = req.body.hospedesMaiores;
    var hospedes_menores = req.body.hospedesMenores;
    var quartos = req.body.quartos;
    var classe = req.body.idClasse;

    var estado_origem;
    var cidade_origem;
    var estado_destino;
    var cidade_destino;
    /*
        res.send(
            "Id Estado Origem: " + id_estado_origem +
            "Id Cidade Origem: " + id_cidade_origem +
            "Id Estado Destino: " + id_estado_destino +
            "Id Cidade Destino: " + id_cidade_destino +
            "Data Origem: " + data_origem +
            "Data Destino: " + data_destino +
            "Hospede Maiores: " + hospedes_maiores +
            "Hospede Menores: " + hospedes_menores +
            "Quartos: " + quartos +
            "Classe: " + classe
        );
    */
    //Transforma ID's de estados e cidades nos nomes
    var Estados = [
        [11, "Rondônia"],
        [12, "Acre"],
        [13, "Amazonas"],
        [14, "Roraima"],
        [15, "Pará"],
        [16, "Amapá"],
        [17, "Tocantins"],
        [21, "Maranhão"],
        [22, "Piauí"],
        [23, "Ceará"],
        [24, "Rio Grande do Norte"],
        [25, "Paraíba"],
        [26, "Pernambuco"],
        [27, "Alagoas"],
        [28, "Sergipe"],
        [29, "Bahia"],
        [31, "Minas Gerais"],
        [32, "Espírito Santo"],
        [33, "Rio de Janeiro"],
        [35, "São Paulo"],
        [41, "Paraná"],
        [42, "Santa Catarina"],
        [43, "Rio Grande do Sul"],
        [50, "Mato Grosso do Sul"],
        [51, "Mato Grosso"],
        [52, "Goaiás"],
        [53, "Distrito Federal"],
    ];

    for (i = 0; i < Estados.length; i++) {
        if (Estados[i][0] == id_estado_origem) {
            estado_origem = Estados[i][1];
        }
        if (Estados[i][0] == id_estado_destino) {
            estado_destino = Estados[i][1];
        }
    }

    // pesquisa_cidade.pesquisaCidade(id_estado_origem, id_cidade_origem).then(v => {
    //     cidade_origem = v;
    //     console.log("resultado cidade_origem: ", cidade_origem);
    // });

    // pesquisa_cidade.pesquisaCidade(id_estado_destino, id_cidade_destino).then(v => {
    //     cidade_destino = v;
    //     console.log("resultado cidade_destino: ", cidade_destino);
    // });

    const init = async () => {
        try {
            //Busca nome da cidade e cod aeroporto de origem 
            cidade_origem = await pesquisa_cidade.pesquisaCidade(id_estado_origem, id_cidade_origem);
            console.log("codigo aeroporto: ", cidade_origem);

            var lista_aer_cid_orig = await search_airports.encontraAeroporto(cidade_origem);
            console.log("codigo aeroporto: ", lista_aer_cid_orig);

            //Busca nome da cidade e cod aeroporto de destino
            cidade_destino = await pesquisa_cidade.pesquisaCidade(id_estado_destino, id_cidade_destino);
            console.log("codigo aeroporto: ", cidade_destino);

            var lista_aer_cid_dest = await search_airports.encontraAeroporto(cidade_destino);
            console.log("codigo aeroporto: ", lista_aer_cid_dest);

            //Retorna tamanho do array de aeroportos
            lista_aer_cid_orig.then(function (resposta) {
                console.log("qtde aeroporto origem: ", resposta.length);
            });

            lista_aer_cid_dest.then(function (resposta) {
                console.log("qtde aeroporto destino: ", resposta.length);
            });

        } catch (erro) {
            console.log(erro);
        }
    }
    init();

    //search_airports.encontraAeroporto(cidade);
    //req.body.(atributo name="texto" dos inputs)
    //req.body.texto



});



app.listen(8080, () => {
    console.log('server funcionando');
});