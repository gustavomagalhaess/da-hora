$(document).ready(function () {
    $("#num_mes_validade").mask("00");
    $("#num_ano_validade").mask("0000");
    $("#num_cartao1").mask("0000");
    $("#num_cartao2").mask("0000");
    $("#num_cartao3").mask("0000");
    $("#num_cartao4").mask("0000");
    $("#mensagem").hide();
    $("#cadastrarCartaoForm").keydown(function () {
        $(".message").remove();
    });
    $("#num_ano_validade").blur(function () {
        var year = new Date().getFullYear();
        if ($(this).val() < year) {
            $("#num_ano_validade").val("");
            $("#message").remove();
            $("#num_ano_validade").after("<span class='text-danger message'><strong>Ano de cartão inválido</strong></span>");
            return;
        }
    });
    $("#num_mes_validade").blur(function () {
        if ($(this).val() > 12) {
            $("#num_mes_validade").val("");
            $("#message").remove();
            $("#num_mes_validade").after("<span class='text-danger message'><strong>Digite um mês válido</strong></span>");
            return;
        }
    });
    $("#btnCadastrarCartao").click(function () {
        var constraints = {
            nom_titular     : {presence: true},
            num_mes_validade: {presence: true},
            num_ano_validade: {presence: true},
            num_seq_tipo    : {presence: true},
            num_cartao1     : {presence: true},
            num_cartao2     : {presence: true},
            num_cartao3     : {presence: true},
            num_cartao4     : {presence: true}
        };
        var cartao      = {
            num_seq_usuario : $("#num_seq_usuario").val(),
            nom_titular     : $("#nom_titular").val(),
            num_mes_validade: $("#num_mes_validade").val(),
            num_ano_validade: $("#num_ano_validade").val(),
            num_seq_tipo    : $("#num_seq_tipo").val(),
            num_cartao1     : $("#num_cartao1").val(),
            num_cartao2     : $("#num_cartao2").val(),
            num_cartao3     : $("#num_cartao3").val(),
            num_cartao4     : $("#num_cartao4").val()
        };
        var alert = validate(cartao, constraints);
        if (alert != undefined) {
            $("#message").remove();
            $.each(alert, function (index) {
                $("#" + index).after("<span class='text-danger message'><strong>Campo obrigatório</strong></span>");
            });
            return;
        }
        $.post(
            "/cartao/cadastrar-cartao",
            cartao,
            function (data) {
                data = JSON.parse(data);
                if (data.salvo == true) {
                    window.location.href = "/usuario/dados-usuario";
                } else {
                    $("#mensagem").attr("class", "alert alert-danger text-center");
                    $("#mensagem").html("<strong>" + data.erro + "</strong>");
                    $("#mensagem").fadeIn("slow");
                }
            }
        ).fail(function () {
            $("#mensagem").attr("class", "alert alert-danger text-center");
            $("#mensagem").html("<strong>Não foi possível cadastrar cartão.</strong>");
            $("#mensagem").fadeIn("slow");
        });
    });
});
