$(document).ready(function () {
    $("#cartao").hide();
    $("#cartaoBandeira").hide();
    $("input[name=num_cod_seg]").mask("000");

    $("input[name=num_seq_form_pag]").click(function(){
        var num_seq_cartao = $(this).val();
        if (num_seq_cartao == 2) {
            $("#cartao").show();
        } else {
            $("#cartao").hide();
        }
    });

    function validarPedido() {
        var formaPagamento = document.getElementById("num_seq_form_pag");
        var endereco       = document.getElementById("num_seq_endereco");
        var cartao         = document.getElementById("num_seq_cartao");

        if (formaPagamento == undefined) {
            alert("Necessário escolher uma forma de pagamento!");
            return false;
        } else if (endereco == undefined) {
            alert("Necessário escolher um endereço de entrega!");
            return false;
        } else if (cartao == undefined) {
            alert("Necessário escolher um cartão para pagamento!");
            return false;
        }

        return true;
    }

    function cancelarPedido() {
        window.location = "/endereco/consultar-cep";
    }

    $("#btnFinalizarPedido").click(function () {

    });
});