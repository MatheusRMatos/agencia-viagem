const soap = require('soap');

const url = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';
cd..
cd..

soap.createClient(url, (err, client) => {
    if (err) {
        console.log(err);
    } else {
        client.consultaCEP({
            cep: '04807040'
        }, (err, resultado) => {
            console.log(resultado)
        });
    }
});