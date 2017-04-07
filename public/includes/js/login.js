$(document).ready(function () {
    $('#mensagem').hide();
    $('#formLogarSistema').keydown(function(){
        $('#mensagem').hide();
        $('.message').remove();
    });
    $("#btnLogin").click(function () {
        var constraints = {
            dsc_email: { presence: true },
            dsc_senha: { presence: true }
        };
        var login = {
            dsc_email: $('#dsc_email').val(),
            dsc_senha: $('#dsc_senha').val()
        };
        var alert = validate(login, constraints);

        if (alert != undefined) {
            $("#message").remove();
            $.each(alert, function(index){
                $("#"+index).after("<span class='text-danger message'><strong>Campo obrigatório</strong></span>");
            });
            return;
        }
        $.post(
            "/login/login",
            login,
            function (data) {
                data = JSON.parse(data);
                if (data.logado) {
                    window.location.href="/pedido/cadastrar-pedido";
                } else {
                    $("#mensagem").attr("class", "alert alert-danger text-center");
                    $("#mensagem").append("<strong>"+data.erro+"</strong>");
                    $("#mensagem").fadeIn('slow');
                }
            }
        ).fail(function () {
            $("#mensagem").attr("class", "alert alert-danger text-center");
            $("#mensagem").append("<strong>Não foi possível realizar login.</strong>");
            $("#mensagem").fadeIn('slow');
        });
    });
});
