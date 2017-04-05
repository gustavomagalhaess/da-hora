$(document).ready(function () {
    $('#cadastroUsuario').load(function(){
        $("#dt_nascimento").mask("00/00/0000"); // Máscara de data
        $("#cpf_usuario").mask("000.000.000-00"); // Máscara de CPF
        $("#num_cel").mask("(00) 00000-0000"); // Máscara de de telefone
    });
    $('#mensagem').hide();

    $("#btnCadastrarUsuario").click(function () {
        var constraints = {
            nome_usuario : {presence: true},
            cpf_usuario  : {presence: true},
            dsc_email    : {presence: true},
            dsc_senha    : {presence: true},
            dsc_senha2   : {presence: true},
            num_cel      : {presence: true},
            dsc_sexo     : {presence: true},
            dt_nascimento: {presence: true}
        };
        var usuario     = {
            nome_usuario : $('#nome_usuario').val(),
            cpf_usuario  : $('#cpf_usuario').val(),
            dsc_email    : $('#dsc_email').val(),
            dsc_senha    : $('#dsc_senha').val(),
            dsc_senha2   : $('#dsc_senha2').val(),
            num_cel      : $('#num_cel').val(),
            dsc_sexo     : $('#dsc_sexo').val(),
            dt_nascimento: $('#dt_nascimento').val()
        };
        var alert = validate(usuario, constraints);
        if (alert != undefined) {
            $("#message").remove();
            $.each(alert, function (index) {
                $("#" + index).after("<span class='text-danger message'><strong>Campo obrigatório</strong></span>");
            });
            return;
        }
        if (usuario.dsc_senha != usuario.dsc_senha2) {
            $("#message").remove();
                $("#dsc_senha2").after("<span class='text-danger message'><strong>Senhas não conferem</strong></span>");
            return;
        }
        $.post(
            "/usuario/cadastar-usuario",
            usuario,
            function (data) {
                data = JSON.parse(data);
                if (data.salvo == true) {
                    window.location.href = '/login/login';
                } else {
                    $("#mensagem").attr("class", "alert alert-danger text-center");
                    $("#mensagem").html("<strong>" + data.erro + "</strong>");
                    $("#mensagem").fadeIn('slow');
                }
            }
        ).fail(function () {
            $("#mensagem").attr("class", "alert alert-danger text-center");
            $("#mensagem").html("<strong>Não foi possível cadastrar usuario.</strong>");
            $("#mensagem").fadeIn('slow');
        });
    });
    $('#btnContinuar').click(function(){
        window.location.href = '/pedido/buscar-pedido';
    });
});
