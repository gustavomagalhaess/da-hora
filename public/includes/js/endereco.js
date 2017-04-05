$(document).ready(function () {
    $(".cep, #num_cep").mask("00.000-000"); // Máscara de CEP
    $("#enderecoForm").hide();
    $("#mensagem").hide();

    $("#cadastrarEnderecoForm").keydown(function(){
        $(".message").hide();
    });

    $("#btnBuscar").click(function () {
        var cep = {cep: $("#cep").val()};
        $.post(
            "endereco/consultar-cep",
            cep,
            function (data) {
                data = JSON.parse(data);
                if (data.success) {
                    var cep = data.cep.slice(0, 2)+"."+data.cep.slice(2, 5)+"-"+data.cep.slice(5, 8);
                    $("#nom_bairro").val(data.bairro);
                    $("#num_cep").val(cep);
                    $("#num_geocodigo").val(data.codigomunicipio);
                    $("#dsc_endereco").val(data.logradouro_curto);
                    $("#cepForm").hide();
                    $("#enderecoForm").attr('class', null);
                    $("#enderecoForm").fadeIn('slow');
                } else {
                    $("#mensagem").attr("class", "alert alert-danger text-center");
                    $("#mensagem").append("<strong>Não foi possível econtrar endereço.</strong>");
                    $("#mensagem").fadeIn('slow');
                }
            }
        ).fail(function () {
            $("#mensagem").attr("class", "alert alert-danger text-center");
            $("#mensagem").append("<strong>Não foi possível econtrar endereço.</strong>");
            $("#mensagem").fadeIn('slow');
        });
    });

    $('#btnCadastrar').click(function () {
        var constraints = {
            dsc_titulo     : {presence: true},
            dsc_endereco   : {presence: true},
            num_endereco   : {presence: true},
            dsc_complemento: {presence: true},
            nom_bairro     : {presence: true},
            num_cep        : {presence: true}
        };

        var endereco = {
            num_geocodigo  : $("#frmCadastrarEndereco #num_geocodigo").val(),
            dsc_titulo     : $("#frmCadastrarEndereco #dsc_titulo").val(),
            dsc_endereco   : $("#frmCadastrarEndereco #dsc_endereco").val(),
            num_endereco   : $("#frmCadastrarEndereco #num_endereco").val(),
            dsc_complemento: $("#frmCadastrarEndereco #dsc_complemento").val(),
            nom_bairro     : $("#frmCadastrarEndereco #nom_bairro").val(),
            num_cep        : $("#frmCadastrarEndereco #num_cep").val()
        };

        var alert = validate(endereco, constraints);
        if (alert != undefined) {
            $("#message").remove();
            $.each(alert, function (index) {
                $("#" + index).after("<span class='text-danger message'><strong>Campo obrigatório</strong></span>");
            });
            return;
        }
        $.post(
            "endereco/salvar-endereco-sessao",
            endereco,
            function (data) {
                data = JSON.parse(data);
                if (data == true) {
                    window.location.href = 'loja/buscar-loja-delivery';
                } else {
                    $("#mensagem").attr("class", "alert alert-danger text-center");
                    $("#mensagem").html("<strong>Não foi possível cadastrar endereço.</strong>");
                    $("#mensagem").fadeIn('slow');
                }
            }
        ).fail(function () {
            $("#mensagem").attr("class", "alert alert-danger text-center");
            $("#mensagem").html("<strong>Não foi possível cadastrar endereço.</strong>");
            $("#mensagem").fadeIn('slow');
        });
    });

    $('#btnCadastrarEndereco').click(function () {
        var constraints = {
            dsc_titulo     : {presence: true},
            dsc_endereco   : {presence: true},
            num_endereco   : {presence: true},
            dsc_complemento: {presence: true},
            nom_bairro     : {presence: true},
            num_cep        : {presence: true}
        };

        var endereco = {
            num_seq_usuario  : $("#num_seq_usuario").val(),
            num_geocodigo  : $("#num_geocodigo").val(),
            dsc_titulo     : $("#dsc_titulo").val(),
            dsc_endereco   : $("#dsc_endereco").val(),
            num_endereco   : $("#num_endereco").val(),
            dsc_complemento: $("#dsc_complemento").val(),
            nom_bairro     : $("#nom_bairro").val(),
            num_cep        : $("#num_cep").val()
        };

        var alert = validate(endereco, constraints);
        if (alert != undefined) {
            $("#message").remove();
            $.each(alert, function (index) {
                $("#" + index).after("<span class='text-danger message'><strong>Campo obrigatório</strong></span>");
            });
            return;
        }
        $.post(
            "/endereco/cadastrar-endereco",
            endereco,
            function (data) {
                data = JSON.parse(data);
                if (data.salvo == true) {
                    window.location.href = '/usuario/dados-usuario';
                } else {
                    $("#mensagem").attr("class", "alert alert-danger text-center");
                    $("#mensagem").html("<strong>"+ data.data +"</strong>");
                    $("#mensagem").fadeIn('slow');
                }
            }
        ).fail(function () {
            $("#mensagem").attr("class", "alert alert-danger text-center");
            $("#mensagem").html("<strong>Não foi possível salvar endereço.</strong>");
            $("#mensagem").fadeIn('slow');
        });
    });
});