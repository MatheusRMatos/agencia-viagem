$(document).ready(function () {
    $("#cep").focusout(function () {
        if ($("#cep").val() != "") {
            var cep = $("#cep").val();
            cep = cep.replace("-", "");
            $("#cidade").empty();
            var urlStr = "https://viacep.com.br/ws/" + cep + "/json/";

            $.ajax({
                url: urlStr,
                type: "get",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $("#collapseEndereco").collapse();
                    localizaEstado(String(data.uf));

                    setTimeout(function () {
                        console.log("Carrega cidade: ", data.localidade);
                        $("#cidade option").filter(function () {
                            return $(this).text() == String(data.localidade);
                        }).prop("selected", true);

                        $("#bairro").val(data.bairro);
                        $("#rua").val(data.logradouro);
                        $("#complemento").val(data.complemento);
                    }, 1000);
                },
                error: function (erro) {
                    alert("Não foi possível encontrar um cep com esse número.");
                    console.log(erro);
                }
            });
        }
    });
});