var id_estados = [
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

for (var i = 0; i < 27; i++) {
    var option = $('<option />');
    option.attr({
        value: id_estados[i][0],
    });
    option.text(id_estados[i][1]);
    $("#estado").append(option);    
}

function localizaCidades(id_uf) {
    console.log("Entrou no localiza cidades");
    var url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + id_uf + "/municipios";

    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        success: function (data) {
            console.log("Lista de Cidades:");
            console.log(data);
            // carrega lista de cidades no select
            for (i = 0; i < data.length; i++) {
                var option = $('<option />');
                option.attr({
                    value: i,
                });
                option.text(data[i].nome);
                $("#cidade").append(option);
            }
            $("#cidade").attr({
                disabled: false
            });
        },
        error: function (erro) {
            console.log(erro);
        }
    });
}

function localizaEstado(uf) {
    console.log("Entrou no localiza Estado");
    var urlStr = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
    
    $.ajax({
        url: urlStr,
        type: "get",
        dataType: "json",
        success: function (data) {
            var estados = data;
            for (i = 0; i < estados.length; i++) {
                if (estados[i].sigla == uf) {
                    $("#estado option").filter(function () {
                        return $(this).text() == estados[i].nome;
                    }).prop("selected", true);
                    localizaCidades(String(estados[i].id));
                }
            }
        },
        error: function (erro) {
            console.log(erro);
        }
    });
}


$("#estado").on('change', function () {
    var id_uf = $("#estado").val();
    $("#cep").val("");
    $("#rua").val("");
    $("#numero-residencia").val("");
    $("#bairro").val("");
    $("#complemento").val("");


    if (id_uf == "") {
        $("#cidade").attr({
            disabled: true
        });
        $("#cidade").empty();
        var option_default = $('<option />');
        option_default.text("Escolha...");
        $("#cidade").append(option_default);
    } else {
        $("#cidade").empty();
        localizaCidades(id_uf);
    }
});

