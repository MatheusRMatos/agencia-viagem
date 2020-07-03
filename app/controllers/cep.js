const soap = require('../assets/api/nodejs/node_modules/soap')

const url = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'

soap.createClient(url, (err, client) => {
    if (err) {
        console.log(err)
    } else {
        client.consultaCEP({
            cep: '04807040'
        }, (err, resultado) => {
            console.log(resultado)
        })
    }
})