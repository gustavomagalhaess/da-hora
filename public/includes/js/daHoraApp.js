/* Inicialização da página pai */
$(document).ready(function () {
    var categorias = $('.itensCategoria');
    if(categorias.length != 0) {
        var item = categorias[0].value.split('|');
        listarCategoria(item[0], item[1]);
    }

    //Máscaras
    $('#num_cod_seg').mask('000');
    $('#num_mes_validade').mask('00');
    $('#num_ano_validade').mask('0000');
    $('#num_cartao1').mask('0000');
    $('#num_cartao2').mask('0000');
    $('#num_cartao3').mask('0000');
    $('#num_cartao4').mask('0000');

    var totalCarrinhoSpan;
    if (totalCarrinhoSpan = document.getElementById("totalCarrinhoSpan")) {
        totalCarrinhoSpan.innerHTML = "R$0,00";
    }

    var $dialog = $(
        '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar progress-bar-danger" style="width: 100%"></div></div>' +
        '</div>' +
        '</div></div></div>');
    $(document).on({
        ajaxStart: function () {
            $dialog.modal().show()
        },
        ajaxStop: function () {
            $dialog.modal('hide')
        }
    });

    $('#cartao').hide();
    $('#cartaoBandeira').hide();

    function escolherFormaPagamento(num_seq_cartao) {
        console.log(num_seq_cartao);
    }
});


function verificarFormulario() {
    var dscSenha = document.getElementById("dsc_senha");
    var dscSenha2 = document.getElementById("dsc_senha2");

    if (dscSenha.value != dscSenha2.value) {
        alert("Senhas diferentes!");
        return false;
    }
    return true;
}


/***********************************/
/****** CARRINHO -> ****************/
/***********************************/
/* Array com os itens selecionados */
var carrinho = [];
var countAcomp = 0;
var countAcompPer = 0;

/* Função responsável por carregar o array com os produtos selecionados e seus respectivos itens */
function carregarCarrinho(produtoObj) {
    var itemCarrinho = carrinho.push({'produto': produtoObj});
    return (itemCarrinho - 1);
}

function countAddItemAcompPer(kAcompPers, element) {
    if (++countAcompPer >= element.qtd_escolha) {
        $(".addItem_" + kAcompPers).hide();
    }
}

function countDelItemAcompPer(kAcompPers, element) {
    if (--countAcompPer < element.qtd_escolha) {
        if (countAcompPer == 0) {
            $(".delItem_" + kAcompPers).hide();
        }
        $(".addItem_" + kAcompPers).show();
    }
}

function countAddItemAcomp(kAcompPers, element) {
    if (++countAcomp >= element.qtd_escolha) {
        $(".addItem_" + kAcompPers).hide();
    }
}

function countDelItemAcomp(kAcompPers, element) {
    if (--countAcomp < element.qtd_escolha) {
        if (countAcomp == 0) {
            $(".delItem_" + kAcompPers).hide();
        }
        $(".addItem_" + kAcompPers).show();
    }
}

/* Função responsável em calcular o valor total do produdo com os acompanhamentos */
function calcularTotalProduto(Produto) {
    var totalProduto = Number(Produto.produto.val_produto_desconto);
    var valorOpcoes = 0;
    var valorAcompanhamento = 0;

    if ($.isArray(Produto.Opcoes) && Produto.Opcoes.length > 0) {
        $.each(Produto.Opcoes, function (itn, Opcoes) {
            valorOpcoes += Number(Opcoes.val_opcao);
        });
        totalProduto += valorOpcoes;
    }
    if ($.isArray(Produto.Acompanhamentos) && Produto.Acompanhamentos.length > 0) {
        $.each(Produto.Acompanhamentos, function (itn, Acomp) {
            valorAcompanhamento += Number(Acomp.val_acompanhamento);
        });
        totalProduto += valorAcompanhamento;
    }
    return totalProduto.toFixed(2);
}

/* Função responsável em deletar o item selecionado do array que contém os produtos */
function deletarProdutoCarrinho(row, produtoObj) {
    var row = row.parentNode.parentNode;
    row.parentNode.removeChild(row);
    carrinho.map(function (element, index) {
        if (element.produto == produtoObj) {
            carrinho.splice(index, 1);
        }
    });
    var totalCarrinhoSpan = document.getElementById("totalCarrinhoSpan");
    totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
}

/* Função responsável em editar os produtos e seus acompanhamentos */
function editarProdutoCarrinho(produtoObj) {
    carrinho.map(function (element) {
        if (element.produto == produtoObj) {
            if (table = document.getElementById("editarProdutoTable")) {
                table.parentNode.removeChild(table);
            }
            var editarProdutoDiv = document.getElementById('editarProduto');
            var editarProdutoTable = document.createElement('table');
            editarProdutoTable.id = 'editarProdutoTable';
            editarProdutoDiv.appendChild(editarProdutoTable);
            var editarProdutoTbody = document.createElement("tbody");
            editarProdutoTable.appendChild(editarProdutoTbody);
            var row = editarProdutoTbody.insertRow(-1);
            var cell = row.insertCell(-1);
            var img = document.createElement("img");
            img.setAttribute("class", "imgProduto");
            img.setAttribute("src", "include/images/" + element.produto.url_imagem);
            cell.appendChild(img);
            var cell = row.insertCell(-1);
            cell.innerHTML = element.produto.nom_produto;
            var cell = row.insertCell(-1);
            cell.insertHTML = "R$" +  element.produto.val_produto_desconto.replace(".", ",");
            $.each(element.Acompanhamentos, function(key, elements){
                var row = editarProdutoTbody.insertRow(-1);
                var cell = row.insertCell(-1);
                var cell = row.insertCell(-1);
                cell.innerHTML = elements.nom_acompanhamento;
                var cell = row.insertCell(-1);
                cell.innerHTML = "R$" +  elements.val_acompanhamento.replace(".", ",");
                console.log(elements);
            });
        }
    });
    editarProduto.dialog('open');
}

/* Função responsável por calcular o valor total do array dos produtos */
function calcularTotalCarrinho() {
    var totalCarrinho = 0;
    $.each(carrinho, function (item, Produto) {
        totalCarrinho += parseFloat(calcularTotalProduto(Produto));
    });
    return totalCarrinho.toFixed(2);
}

/* Função responsável em inserir a opção no produto */
function selecionarOpcao(produtOpcao) {
    var ids = produtOpcao.split("|");
    var protudoId = ids[0];
    var opcaoId = ids[1]
    $.each(carrinho[protudoId].produto.Opcoes, function (opcoesKey, element) {
        if (element.num_seq_opcao == opcaoId) {
            carrinho[protudoId]['Opcoes'].push(element);
        }
    });

    var carrinhoCell = document.getElementById("idProduto_" + protudoId);
    var totalProduto = calcularTotalProduto(carrinho[protudoId]);
    carrinhoCell.innerHTML = "R$" + totalProduto.replace(".", ",");
    var totalCarrinhoSpan = document.getElementById("totalCarrinhoSpan");
    totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
}

/* Função responsável por atualizar a div do carrinho */
function carregaDivTotalCarrinho(carinhoItemId, produtoObj) {
    var totalCarrinhoSpan = document.getElementById("totalCarrinhoSpan");
    totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
    var carrinhoTable = document.getElementById("carrinhoTable");
    var row = carrinhoTable.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.innerHTML = produtoObj.nom_produto;
    var cell = row.insertCell(-1);
    cell.setAttribute("id", "idProduto_" + carinhoItemId);
    cell.innerHTML = "R$" + produtoObj.val_produto_desconto.replace(".", ",");
    var cell = row.insertCell(-1);
    if(produtoObj.Opcoes.length == 0) {
        icViewItem = document.createElement("i");
        icViewItem.setAttribute("class", "glyphicon glyphicon-eye-open");
        icViewItem.onclick = function () {
            editarProdutoCarrinho(produtoObj);
        }
        cell.appendChild(icViewItem);
    }
    var cell = row.insertCell(-1);
    icDelItem = document.createElement("i");
    icDelItem.setAttribute("class", "glyphicon glyphicon-minus-sign red");
    icDelItem.onclick = function () {
        deletarProdutoCarrinho(this, produtoObj);
    }
    cell.appendChild(icDelItem);
    var cell = row.insertCell(-1);
    var txt_observacao = 'txt_observacao_' + carinhoItemId;
    icCmt = document.createElement("i");
    icCmt.setAttribute("class", "glyphicon glyphicon-comment green");
    icCmt.onclick = function () {
        inserirObservacao.html("<textarea id='txt_observacao' cols=40 rows=10 ></textarea>");
        inserirObservacao.data("obsData", produtoObj).dialog('open');
    };
    cell.appendChild(icCmt);
}

/* Modals */
var acompanhamentosPersonalizados = $("#acompanhamentosDialog").dialog({
    autoOpen: false,
    modal: true,
    dialogClass: "no-close",
    width: 700,
    resizable: false,
    title: "Adicionar Acompanhamentos",
    buttons: [
        {
            text: "Continuar",
            class: "btn btn-danger",
            click: function () {
                $(this).dialog("close");
            }
        }
    ]
});

var cadastrarUsuario = $("#cadastroUsuarioDialog").dialog({
    autoOpen: false,
    modal: true,
    dialogClass: "no-close",
    width: 700,
    resizable: false,
    title: "Cadastro",
    buttons: [
        {
            text: "Continuar",
            class: "btn btn-danger",
            click: function () {
                $(this).dialog("close");
            }
        }
    ]
});

var inserirObservacao = $("#observacao").dialog({
    autoOpen: false,
    modal: true,
    dialogClass: "no-close",
    width: 350,
    resizable: false,
    title: "Observação",
    buttons: [
        {
            text: "Continuar",
            class: "btn btn-danger",
            click: function () {
                var observacao = document.getElementById('txt_observacao').value;
                inserirObservacaoProduto(observacao);
                $(this).dialog("close");
            }
        }
    ]
});

var editarProduto = $("#editarProduto").dialog({
    autoOpen: false,
    modal: true,
    dialogClass: "no-close",
    width: 700,
    resizable: false,
    title: "Produto",
    buttons: [
        {
            text: "Alterar Acompanhamentos",
            class: "btn btn-danger",
            click: function () {
                $(this).dialog("close");
                acompanhamentosPersonalizados.dialog('open');
            }
        },
        {
            text: "Continuar",
            class: "btn btn-danger",
            click: function () {
                $(this).dialog("close");
            }
        }
    ]
});

var opcoes = $("#opcoesDialog").dialog({
    autoOpen: false,
    modal: true,
    dialogClass: "no-close",
    width: 350,
    resizable: false,
    title: "Selecione a opção!",
    buttons: [
        {
            text: "Continuar",
            class: "btn btn-danger",
            click: function () {
                var produtOpcao = document.getElementById('num_seq_opcao').value;
                selecionarOpcao(produtOpcao);
                $(this).dialog("close");
            }
        }
    ]
});
/* Fim modals */

/* Função que busca a Loja de acordo com o CEP informado */
function buscarLojaDelivery() {
    document.getElementById("formRetornarCEP").submit();
}

/* Função que salva na sessão o endereço informado no fomrulário */
function salvarEndereco() {
    document.getElementById("formRetornarCEP").submit();
}

/* Função que lista as categorias cadastrada na loja e seus respecitvos detalhes */
function listarCategoria(numSeqCategoria, numSeqLoja) {
    $.post(
        "index.php?acao=buscarProdutoLista",
        {
            num_seq_categoria: numSeqCategoria,
            num_seq_loja: numSeqLoja
        },
        function (data) {
            if (table = document.getElementById("detalheProdutoTbody")) {
                table.parentNode.removeChild(table);
            }
            var dataObj = JSON.parse(data);
            var detalheProdutoTable = document.getElementById("detalheProdutoTable");
            var detalheProdutoTbody = document.createElement("tbody");
            detalheProdutoTbody.id = "detalheProdutoTbody";
            detalheProdutoTable.appendChild(detalheProdutoTbody);
            if (dataObj.sucesso) {
                /* Função responsável por listar os detalhes da categoria selecionada */
                $.each(dataObj.Produtos,
                    function (key, element) {
                        var row = detalheProdutoTbody.insertRow(-1);
                        var cell = row.insertCell(-1);
                        var img = document.createElement("img");
                        img.setAttribute("class", "imgProduto");
                        img.setAttribute("src", "include/images/" + element.url_imagem);
                        cell.appendChild(img);
                        var cell = row.insertCell(-1);
                        cell.innerHTML = element.nom_produto;
                        var cell = row.insertCell(-1);
                        cell.innerHTML = element.dsc_produto;
                        var cell = row.insertCell(-1);
                        cell.innerHTML = "R$" + element.val_produto.replace(".", ",");
                        var cell = row.insertCell(-1);
                        elem = document.createElement("span");
                        elem.setAttribute("class", "glyphicon glyphicon-plus-sign green");
                        elem.onclick = function () {
                            inserirProdutoCarrinho(element);
                        };
                        cell.appendChild(elem);
                    }
                );

                var detalheProduto = document.getElementById("detalheProdutoDiv");
                detalheProduto.appendChild(detalheProdutoTable);
            } else {
                var row = detalheProdutoTbody.insertRow(-1);
                var cell = row.insertCell(-1);
                cell.innerHTML = dataObj.erro;
            }
        }
    );
}

/* Insere o produto selecionado no Carrinho */
function inserirProdutoCarrinho(produtoObj) {
    $.post(
        "index.php?acao=buscarProdutoCardapio",
        {"num_seq_loja": produtoObj.num_seq_loja, "num_seq_produto": produtoObj.num_seq_produto},
        function (data) {
            var dataObj = JSON.parse(data);
            if (dataObj.sucesso) {
                var carinhoItemId = carregarCarrinho(produtoObj);
                carregaDivTotalCarrinho(carinhoItemId, produtoObj);
                if (produtoObj.Opcoes.length > 0) {
                    carrinho[carinhoItemId]['Opcoes'] = []; //Cria array pra inserir as opções
                    if (table = document.getElementById("opcoesTable")) {
                        table.parentNode.removeChild(table);
                    }
                    var opcoesDialog = document.getElementById("opcoesDialog");
                    var opcoesTable = document.createElement("opcoesTable");
                    opcoesTable.setAttribute("id", "opcoesTable");
                    opcoesTable.setAttribute("class", "table table-hover table-condensed");
                    opcoesDialog.appendChild(opcoesTable);
                    var opcoesTbody = document.createElement("tbody");
                    opcoesTbody.setAttribute("id", "opcoesTbody");
                    opcoesTable.appendChild(opcoesTbody);
                    $.each(produtoObj.Opcoes,
                        function (kOpcao, element) {
                            var row = opcoesTbody.insertRow(-1);
                            var cell = row.insertCell(-1);
                            var inputOpcao = document.createElement("input");
                            inputOpcao.setAttribute("type", "radio");
                            inputOpcao.setAttribute("id", "num_seq_opcao");
                            inputOpcao.setAttribute("value", carinhoItemId + "|" + element.num_seq_opcao);
                            cell.appendChild(inputOpcao);
                            var cell = row.insertCell(-1);
                            cell.innerHTML = element.nom_opcao;
                            var cell = row.insertCell(-1);
                            cell.innerHTML = "R$" + element.val_opcao.replace(".", ",");
                            opcoes.dialog("open");
                        }
                    );
                }
                if (dataObj.Produto.sts_personalizado != 0) {
                    countAcomp = countAcompPer = 0;
                    carrinho[carinhoItemId]['Acompanhamentos'] = []; //Cria array para inserir os acompanhamentos
                    carrinho[carinhoItemId]['Ingredientes'] = []; //Cria array para inserir os ingredientes obrigatorios
                    if (table = document.getElementById("acompanhamentosTable")) {
                        table.parentNode.removeChild(table);
                    }
                    var acompanhamentosDialog = document.getElementById("acompanhamentosDialog");
                    var acompanhamentosTable = document.createElement("table");
                    acompanhamentosTable.setAttribute("id", "acompanhamentosTable");
                    acompanhamentosTable.setAttribute("class", "table table-hover table-condensed");
                    acompanhamentosDialog.appendChild(acompanhamentosTable);
                    var acompanhamentosTbody = document.createElement("tbody");
                    acompanhamentosTbody.setAttribute("id", "acompanhamentosTbody");
                    acompanhamentosTable.appendChild(acompanhamentosTbody);
                    $.each(dataObj.AcompanhamentosPersonalizados,
                        /* Função responsável por listar os acompanhamentos personalizados pro tipo de escolha */
                        function (kAcompPers, element) {
                            var row = acompanhamentosTbody.insertRow(-1);
                            var cell = row.insertCell(-1);
                            cell.colSpan = 4;
                            cell.setAttribute("class", "ui-widget-header text-center")
                            cell.innerHTML = element.txt_escolha;
                            $.each(element.Acompanhamentos,
                                /* Função responsável por listar os itens personalizados de cada tipo de escolha */
                                function (kAcomp, itemAcompanhamento) {
                                    var row = acompanhamentosTbody.insertRow(-1);
                                    var cell = row.insertCell(-1);
                                    cell.innerHTML = itemAcompanhamento.nom_acompanhamento;
                                    var cell = row.insertCell(-1);
                                    cell.innerHTML = "R$" + itemAcompanhamento.val_acompanhamento.replace(".", ",");
                                    var cell = row.insertCell(-1);
                                    var icDelAcomp = document.createElement("span");
                                    icDelAcomp.setAttribute("class", "glyphicon glyphicon-minus-sign red delItem_" + kAcompPers);
                                    icDelAcomp.onclick = function () {
                                        deletarProdutoPersonalizadoDetalhe(carinhoItemId, itemAcompanhamento, kAcompPers, element);
                                    };
                                    cell.appendChild(icDelAcomp);
                                    var cell = row.insertCell(-1);
                                    var icAddAcomp = document.createElement("span");
                                    icAddAcomp.setAttribute("class", "glyphicon glyphicon-plus-sign green addItem_" + kAcompPers);
                                    icAddAcomp.onclick = function () {
                                        inserirProdutoPersonalizadoDetalhe(carinhoItemId, itemAcompanhamento, kAcompPers, element);
                                    };
                                    cell.appendChild(icAddAcomp);
                                    $(".delItem_" + kAcompPers).hide();
                                }
                            );
                        }
                    );
                    acompanhamentosPersonalizados.dialog("open");
                }
            } else {
                alert(dataObj.erro);
            }
        }
    );
}

/* Função responsável por inserir os produtos personalizados no array */
function inserirProdutoPersonalizadoDetalhe(carinhoItemId, itemAcompanhamento, kAcompPers, element) {
    carrinho[carinhoItemId]['Acompanhamentos'].push(itemAcompanhamento);
    var carrinhoCell = document.getElementById("idProduto_" + carinhoItemId);
    var totalProduto = calcularTotalProduto(carrinho[carinhoItemId]);
    carrinhoCell.innerHTML = "R$" + totalProduto.replace(".", ",");
    var totalCarrinhoSpan = document.getElementById("totalCarrinhoSpan");
    totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
    $(".delItem_" + kAcompPers).show();
    if (element.qtd_escolha > 0 && element.qtd_escolha != 50) {
        countAddItemAcompPer(kAcompPers, element);
    } else {
        element.qtd_escolha = 50; // Para qtd_escolha == 0
        countAddItemAcomp(kAcompPers, element);
    }
}

function deletarProdutoPersonalizadoDetalhe(carinhoItemId, itemAcompanhamento, kAcompPers, element) {
    carrinho[carinhoItemId]['Acompanhamentos'].pop();
    var carrinhoCell = document.getElementById("idProduto_" + carinhoItemId);
    var totalProduto = calcularTotalProduto(carrinho[carinhoItemId]);
    carrinhoCell.innerHTML = "R$" + totalProduto.replace(".", ",");
    var totalCarrinhoSpan = document.getElementById("totalCarrinhoSpan");
    totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
    if (element.qtd_escolha > 0 && element.qtd_escolha != 50) {
        countDelItemAcompPer(kAcompPers, element);
    } else {
        element.qtd_escolha = 50; // Para qtd_escolha == 0
        countDelItemAcomp(kAcompPers, element);
    }
}

function inserirObservacaoProduto(observacao) {
    var produto = inserirObservacao.data("obsData");
    produto.txt_observacao = observacao;
}
/****** <- CARRINHO ****************/

/**
 * Função responsável por finalizar o pedido
 * Se o usuário tiver logado, direciona para a tela de cadastro do pedido
 **/
function finalizarPedido() {
    $.post(
        "index.php?acao=salvarPedido",
        {carrinho: carrinho},
        function (data) {
            var login = JSON.parse(data);
            if (!login) {
                window.location = "index.php?acao=telaLogarSistema";
            } else {
                window.location = "index.php?acao=telaCadastrarPedido";
            }
        }
    );
}

function validarPedido(){
    var formaPagamento = document.getElementById("num_seq_form_pag");
    var endereco = document.getElementById("num_seq_endereco");
    var cartao = document.getElementById("num_seq_cartao");

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

function escolherFormaPagamento(num_seq_cartao) {
    if (num_seq_cartao == 2) {
        $('#cartao').show();
    } else {
        $('#cartao').hide();
    }
}

function cancelarPedido() {
    window.location = "index.php?acao=consultarCEP";
}
