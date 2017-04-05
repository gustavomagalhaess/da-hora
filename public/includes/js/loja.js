/* Inicialização da página pai */
$(document).ready(function () {
    $("#btnFinalizarPedido").hide();
    var categorias = $('.itensCategoria');
    if (categorias.length != 0) {
        var item = categorias[0].value.split('|');
        listarCategoria(item[0], item[1]);
    }

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
        ajaxStop : function () {
            $dialog.modal('hide')
        }
    });
});

/***********************************/
/****** CARRINHO -> ****************/
/***********************************/
/* Array com os itens selecionados */
var carrinho      = [];
var countAcomp    = 0;
var countAcompPer = 0;
var carrinhoItemIdGlobal;
var carrinhoProdutoGlobal;
var stsObrigatorio;
var opcoesExiste;

/* Função responsável por carregar o array com os produtos selecionados e seus respectivos itens */
function carregarCarrinho(produtoObj) {
    var itemCarrinho = carrinho.push({'produto': produtoObj});
    return (itemCarrinho - 1);
}

function countAddItemAcompPer(kAcompPers, element) {
    if (++countAcompPer >= element.qtd_escolha) {
        $(".addItem_" + kAcompPers).hide();
        $(".addStopItem_" + kAcompPers).show();
    }
}

function countDelItemAcompPer(kAcompPers, element) {
    if (--countAcompPer < element.qtd_escolha) {
        if (countAcompPer == 0) {
            $(".delItem_" + kAcompPers).hide();
            $(".delStopItem_" + kAcompPers).show();
        }
        $(".addItem_" + kAcompPers).show();
        $(".addStopItem_" + kAcompPers).hide();
    }
}

function countAddItemAcomp(kAcompPers, element) {
    if (++countAcomp >= element.qtd_escolha) {
        countItemAcomp.innerText = countAcomp;
        $(".addItem_" + kAcompPers).hide();
        $(".addStopItem_" + kAcompPers).show();
    }
}

function countDelItemAcomp(kAcompPers, element) {
    if (--countAcomp < element.qtd_escolha) {
        if (countAcomp == 0) {
            $(".delItem_" + kAcompPers).hide();
            $(".delStopItem_" + kAcompPers).show();
        }
        $(".addItem_" + kAcompPers).show();
        $(".addStopItem_" + kAcompPers).hide();
    }
}

function countAddItem(kAcompPers, kAcomp) {
    var countItemAcomp       = document.getElementById("countItemAcomp_" + kAcompPers + "_" + kAcomp);
    var countAcomp           = countItemAcomp.innerText;
    countItemAcomp.innerText = ++countAcomp;
}

function countDelItem(kAcompPers, kAcomp) {
    var countItemAcomp       = document.getElementById("countItemAcomp_" + kAcompPers + "_" + kAcomp);
    var countAcomp           = countItemAcomp.innerText;
    countItemAcomp.innerText = countAcomp >= 1 ? --countAcomp : 0;
}

/* Função responsável em calcular o valor total do produdo com os acompanhamentos */
function calcularTotalProduto(Produto) {
    var totalProduto        = Number(Produto.produto.val_produto_desconto);
    var valorOpcoes         = 0;
    var valorAcompanhamento = 0;

    if ($.isArray(Produto.Opcoes) && Produto.Opcoes.length > 0) {
        $.each(Produto.Opcoes, function (itn, Opcoes) {
            valorOpcoes += Number(Opcoes.val_opcao);
        });
        totalProduto += valorOpcoes;
    }
    if ($.isArray(Produto.Acompanhamentos) && Produto.Acompanhamentos.length > 0) {
        $.each(Produto.Acompanhamentos, function (itn, Acomp) {
            var valor = Acomp.val_acompanhamento != 0.01 ? Acomp.val_acompanhamento : 0;
            valorAcompanhamento += Number(valor);
        });
        totalProduto += valorAcompanhamento;
    }
    return totalProduto.toFixed(2);
}

/* Função responsável em deletar o item selecionado do array que contém os produtos */
function deletarProdutoCarrinho(row, produtoObj) {
    // var row = row.parentNode.parentNode;
    row.parentNode.removeChild(row);
    carrinho.map(function (element, index) {
        if (element.produto == produtoObj) {
            carrinho.splice(index, 1);
        }
    });
    var totalCarrinhoSpan       = document.getElementById("totalCarrinhoSpan");
    totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
}

/* Função responsável em editar os produtos e seus acompanhamentos */
function editarProdutoCarrinho(produtoObj) {
    carrinho.map(function (element) {
        if (element.produto == produtoObj) {
            if (table = document.getElementById("editarProdutoTable")) {
                table.parentNode.removeChild(table);
            }
            var editarProdutoDiv   = document.getElementById('editarProduto');
            var editarProdutoTable = document.createElement('table');
            editarProdutoTable.id  = 'editarProdutoTable';
            editarProdutoTable.setAttribute("class", "table table-hover table-condensed");
            editarProdutoDiv.appendChild(editarProdutoTable);
            var editarProdutoTbody = document.createElement("tbody");
            editarProdutoTable.appendChild(editarProdutoTbody);
            var row  = editarProdutoTbody.insertRow(-1);
            var cell = row.insertCell(-1);
            var img  = document.createElement("img");
            img.setAttribute("class", "imgProduto");
            img.setAttribute("src", "/include/img/" + element.produto.url_imagem);
            cell.appendChild(img);
            var cell        = row.insertCell(-1);
            cell.innerHTML  = element.produto.nom_produto;
            var cell        = row.insertCell(-1);
            cell.insertHTML = "R$" + element.produto.val_produto_desconto.replace(".", ",");
            $.each(element.Acompanhamentos, function (key, elements) {
                var row        = editarProdutoTbody.insertRow(-1);
                // var cell = row.insertCell(-1);
                var cell       = row.insertCell(-1);
                cell.innerHTML = elements.nom_acompanhamento;
                var cell       = row.insertCell(-1);
                cell.innerHTML = "R$" + elements.val_acompanhamento.replace(".", ",");
            });
        }
    });
    editarProduto.dialog('open');
}

/* Função responsável por calcular o valor total do array dos produtos */
function calcularTotalCarrinho() {
    var total         = 0;
    var totalCarrinho = 0;
    $.each(carrinho, function (item, Produto) {
        total += parseFloat(calcularTotalProduto(Produto) * Produto.produto.qtd_produto);
    });
    totalCarrinho = total.toFixed(2);
    if (totalCarrinho == 0) {
        $("#btnFinalizarPedido").hide();
    } else {
        $("#btnFinalizarPedido").show();
    }
    return totalCarrinho;
}

/* Função responsável em inserir a opção no produto */
function selecionarOpcao(produtOpcao) {
    var ids       = produtOpcao.split("|");
    var protudoId = ids[0];
    var opcaoId   = ids[1]
    $.each(carrinho[protudoId].produto.Opcoes, function (opcoesKey, element) {
        if (element.num_seq_opcao == opcaoId) {
            carrinho[protudoId]['Opcoes'].push(element);
        }
    });

    var carrinhoCell            = document.getElementById("idProduto_" + protudoId);
    var totalProduto            = calcularTotalProduto(carrinho[protudoId]);
    carrinhoCell.innerHTML      = "R$" + totalProduto.replace(".", ",");
    var totalCarrinhoSpan       = document.getElementById("totalCarrinhoSpan");
    totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
}

/* Função responsável por atualizar a div do carrinho */
function carregaDivTotalCarrinho(carinhoItemId, produtoObj) {
    var totalCarrinhoSpan       = document.getElementById("totalCarrinhoSpan");
    totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
    if (row = document.getElementById("row_" + carinhoItemId)) {
        row.parentNode.removeChild(row);
    }
    var carrinhoTable = document.getElementById("carrinhoTable");
    var row           = carrinhoTable.insertRow(-1);
    row.id            = "row_" + carinhoItemId;
    var cell          = row.insertCell(-1);
    cell.innerHTML    = produtoObj.qtd_produto;
    var cell          = row.insertCell(-1);
    cell.innerHTML    = produtoObj.nom_produto;
    var cell          = row.insertCell(-1);
    cell.setAttribute("id", "idProduto_" + carinhoItemId);
    cell.innerHTML = "R$" + produtoObj.val_produto_desconto.replace(".", ",");
    var cell       = row.insertCell(-1);
    if (produtoObj.Opcoes.length == 0) {
        icViewItem = document.createElement("i");
        icViewItem.setAttribute("class", "glyphicon glyphicon-eye-open");
        icViewItem.onclick = function () {
            editarProdutoCarrinho(produtoObj);
        }
        cell.appendChild(icViewItem);
    }
    var cell  = row.insertCell(-1);
    icDelItem = document.createElement("i");
    icDelItem.setAttribute("class", "glyphicon glyphicon-minus-sign red");
    icDelItem.onclick = function () {
        deletarProdutoCarrinho(this.parentNode.parentNode, produtoObj);
    }
    cell.appendChild(icDelItem);
    var cell = row.insertCell(-1);
    icCmt    = document.createElement("i");
    icCmt.setAttribute("class", "glyphicon glyphicon-comment green");
    icCmt.onclick = function () {
        var txt_observacao = produtoObj.txt_observacao;
        txt_observacao     = txt_observacao != undefined ? txt_observacao : '';
        inserirObservacao.html("<textarea id='txt_observacao_" + carinhoItemId + "' cols=40 rows=10 >" + txt_observacao + "</textarea>");
        inserirObservacao.data("txt_observacao_" + carinhoItemId, produtoObj).dialog('open');
    };
    cell.appendChild(icCmt);
}

/* Modals */
var acompanhamentosPersonalizados = $("#acompanhamentosDialog").dialog({
    closeOnEscape: false,
    autoOpen     : false,
    modal        : true,
    dialogClass  : "no-close",
    width        : 700,
    resizable    : false,
    title        : "Adicionar Acompanhamentos",
    buttons      : [
        {
            text : "Cancelar",
            class: "btn btn-danger",
            click: function () {
                cancelarProduto(carrinhoItemIdGlobal, carrinhoProdutoGlobal);
                $(this).dialog("close");
            }
        },
        {
            text : "Adicionar",
            class: "btn btn-danger",
            click: function () {
                if (stsObrigatorio) {
                    opcoes.dialog("close");
                    alert("Escolha do acompanhamento obrigatório.");
                    return;
                }
                inserirObservacao.html("<textarea id='txt_observacao_" + carrinhoItemIdGlobal + "' cols=40 rows=10 ></textarea>");
                inserirObservacao.data("txt_observacao_" + carrinhoItemIdGlobal, carrinhoProdutoGlobal).dialog('open');
                $(this).dialog("close");
            }
        }
    ]
});

var inserirObservacao = $("#observacao").dialog({
    closeOnEscape: false,
    autoOpen     : false,
    modal        : true,
    dialogClass  : "no-close",
    width        : 350,
    resizable    : false,
    title        : "Observação",
    buttons      : [
        {
            text : "Continuar",
            class: "btn btn-danger",
            click: function () {
                var txt_observacao = $(this).children().val();
                var id_observacao  = $(this).children().attr('id');
                inserirObservacaoProduto(id_observacao, txt_observacao);
                quantidadeProduto.html("<span>Quantidade: </span><input type='number' min=1 max=50 id='qtd_produto_" + carrinhoItemIdGlobal + "' value=1 />");
                quantidadeProduto.dialog("open");
                $(this).dialog("close");
            }
        }
    ]
});

var quantidadeProduto = $("#qdeProduto").dialog({
    closeOnEscape: false,
    autoOpen     : false,
    modal        : true,
    dialogClass  : "no-close",
    width        : 350,
    resizable    : false,
    title        : "Escolha a quantidade",
    buttons      : [
        {
            text : "Continuar",
            class: "btn btn-danger",
            click: function () {
                var qtd_produto                   = $(this).children()[1];
                carrinhoProdutoGlobal.qtd_produto = $(qtd_produto).val();
                var carrinhoCell                  = document.getElementById("row_" + carrinhoItemIdGlobal).firstChild;
                carrinhoCell.innerText            = $(qtd_produto).val();
                var totalCarrinhoSpan             = document.getElementById("totalCarrinhoSpan");
                totalCarrinhoSpan.innerHTML       = "R$" + calcularTotalCarrinho().replace(".", ",");
                $(this).dialog("close");
            }
        }
    ]
});

var editarProduto = $("#editarProduto").dialog({
    closeOnEscape: false,
    autoOpen     : false,
    modal        : true,
    dialogClass  : "no-close",
    width        : 700,
    resizable    : false,
    title        : "Produto",
    buttons      : [
        {
            text : "Alterar Acompanhamentos",
            class: "btn btn-danger",
            click: function () {
                $(this).dialog("close");
                acompanhamentosPersonalizados.dialog('open');
            }
        },
        {
            text : "Continuar",
            class: "btn btn-danger",
            click: function () {
                $(this).dialog("close");
            }
        }
    ]
});

var opcoes = $("#opcoesDialog").dialog({
    closeOnEscape: false,
    autoOpen     : false,
    modal        : true,
    dialogClass  : "no-close",
    width        : 350,
    resizable    : false,
    title        : "Selecione a opção!",
    buttons      : [
        {
            text : "Cancelar",
            class: "btn btn-danger",
            click: function () {
                cancelarProduto(carrinhoItemIdGlobal, carrinhoProdutoGlobal);
                $(this).dialog("close");
            }
        },
        {
            text : "Continuar",
            class: "btn btn-danger",
            click: function () {
                //var produtOpcao = document.getElementById('num_seq_opcao').value;
                var produtOpcao   = false;
                var produtosOpcao = $('input[name=num_seq_opcao]');
                produtosOpcao.each(function (key, element) {
                    if (element.checked) {
                        produtOpcao = element.value;
                    }
                });
                if (stsObrigatorio && !produtOpcao) {
                    alert("Escolha da opção é obrigatória.");
                    return;
                }
                selecionarOpcao(produtOpcao);
                $(this).dialog("close");
                if (opcoesExiste) {
                    acompanhamentosPersonalizados.dialog("open");
                }
            }
        }
    ]
});
/* Fim modals */

/* Função que lista as categorias cadastrada na loja e seus respecitvos detalhes */
function listarCategoria(numSeqCategoria, numSeqLoja) {
    stsObrigatorio = false;
    opcoesExiste   = false;
    $.post(
        "/loja/buscar-produto-lista",
        {
            num_seq_categoria: numSeqCategoria,
            num_seq_loja     : numSeqLoja
        },
        function (data) {
            if (table = document.getElementById("detalheProdutoTbody")) {
                table.parentNode.removeChild(table);
            }
            var dataObj             = JSON.parse(data);
            var detalheProdutoTable = document.getElementById("detalheProdutoTable");
            var detalheProdutoTbody = document.createElement("tbody");
            detalheProdutoTbody.id  = "detalheProdutoTbody";
            detalheProdutoTable.appendChild(detalheProdutoTbody);
            if (dataObj.sucesso) {
                /* Função responsável por listar os detalhes da categoria selecionada */
                $.each(dataObj.Produtos,
                    function (key, element) {
                        element.qtd_produto = 1;
                        var row             = detalheProdutoTbody.insertRow(-1);
                        var cell            = row.insertCell(-1);
                        var img             = document.createElement("img");
                        img.setAttribute("class", "imgProduto");
                        img.setAttribute("src", "/includes/img/" + element.url_imagem);
                        cell.appendChild(img);
                        var cell       = row.insertCell(-1);
                        cell.innerHTML = element.nom_produto;
                        var cell       = row.insertCell(-1);
                        cell.innerHTML = element.dsc_produto;
                        var cell       = row.insertCell(-1);
                        if (element.val_produto != "0.01") {
                            cell.innerHTML = "R$" + element.val_produto.replace(".", ",");
                        }
                        var cell = row.insertCell(-1);
                        elem     = document.createElement("span");
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
                var row        = detalheProdutoTbody.insertRow(-1);
                var cell       = row.insertCell(-1);
                cell.innerHTML = dataObj.erro;
            }
        }
    );
}

/* Insere o produto selecionado no Carrinho */
function inserirProdutoCarrinho(produtoObj) {
    $.post(
        "/loja/buscar-produto-cardapio",
        {
            "num_seq_loja"   : produtoObj.num_seq_loja,
            "num_seq_produto": produtoObj.num_seq_produto
        },
        function (data) {
            var dataObj = JSON.parse(data);
            if (dataObj.sucesso) {
                var carinhoItemId     = carregarCarrinho(produtoObj);
                carrinhoItemIdGlobal  = carinhoItemId;
                carrinhoProdutoGlobal = produtoObj;
                carregaDivTotalCarrinho(carinhoItemId, produtoObj);
                if (produtoObj.Opcoes.length > 0) {
                    opcoesExiste                      = true;
                    carrinho[carinhoItemId]['Opcoes'] = []; //Cria array pra inserir as opções
                    if (table = document.getElementById("opcoesTable")) {
                        table.parentNode.removeChild(table);
                    }
                    var opcoesDialog = document.getElementById("opcoesDialog");
                    var opcoesTable  = document.createElement("opcoesTable");
                    opcoesTable.setAttribute("id", "opcoesTable");
                    opcoesTable.setAttribute("class", "table table-hover table-condensed");
                    opcoesDialog.appendChild(opcoesTable);
                    var opcoesTbody = document.createElement("tbody");
                    opcoesTbody.setAttribute("id", "opcoesTbody");
                    opcoesTable.appendChild(opcoesTbody);
                    $.each(produtoObj.Opcoes,
                        function (kOpcao, element) {
                            var row        = opcoesTbody.insertRow(-1);
                            var cell       = row.insertCell(-1);
                            var inputOpcao = document.createElement("input");
                            inputOpcao.setAttribute("type", "radio");
                            inputOpcao.setAttribute("id", "num_seq_opcao_" + kOpcao);
                            inputOpcao.setAttribute("name", "num_seq_opcao");
                            inputOpcao.setAttribute("value", carinhoItemId + "|" + element.num_seq_opcao);
                            cell.appendChild(inputOpcao);
                            var cell       = row.insertCell(-1);
                            cell.innerHTML = element.nom_opcao;
                            var cell       = row.insertCell(-1);
                            cell.innerHTML = "R$" + element.val_opcao.replace(".", ",");
                        }
                    );
                }
                if (dataObj.Produto.sts_personalizado != 0) {
                    countAcomp = countAcompPer = 0;
                    carrinho[carinhoItemId]['Acompanhamentos'] = []; //Cria array para inserir os acompanhamentos
                    carrinho[carinhoItemId]['Ingredientes']    = []; //Cria array para inserir os ingredientes obrigatorios
                    if (table = document.getElementById("acompanhamentosTable")) {
                        table.parentNode.removeChild(table);
                    }
                    var acompanhamentosDialog = document.getElementById("acompanhamentosDialog");
                    var acompanhamentosTable  = document.createElement("table");
                    acompanhamentosTable.setAttribute("id", "acompanhamentosTable");
                    acompanhamentosTable.setAttribute("class", "table table-hover table-condensed");
                    acompanhamentosDialog.appendChild(acompanhamentosTable);
                    var acompanhamentosTbody = document.createElement("tbody");
                    acompanhamentosTbody.setAttribute("id", "acompanhamentosTbody");
                    acompanhamentosTable.appendChild(acompanhamentosTbody);
                    $.each(dataObj.AcompanhamentosPersonalizados,
                        /* Função responsável por listar os acompanhamentos personalizados pro tipo de escolha */
                        function (kAcompPers, element) {
                            stsObrigatorio = element.sts_obrigatorio == 1 ? true : false;
                            var row        = acompanhamentosTbody.insertRow(-1);
                            var cell       = row.insertCell(-1);
                            cell.colSpan   = 5;
                            cell.setAttribute("class", "ui-widget-header text-center")
                            cell.innerHTML = element.txt_escolha;
                            $.each(element.Acompanhamentos,
                                /* Função responsável por listar os itens personalizados de cada tipo de escolha */
                                function (kAcomp, itemAcompanhamento) {
                                    var row        = acompanhamentosTbody.insertRow(-1);
                                    var cell       = row.insertCell(-1);
                                    cell.innerText = itemAcompanhamento.nom_acompanhamento;
                                    var cell       = row.insertCell(-1);
                                    if (element.sts_cobrar_acomp == 1) {
                                        cell.innerText = "R$" + itemAcompanhamento.val_acompanhamento.replace(".", ",");
                                    }
                                    var cell       = row.insertCell(-1);
                                    var icDelAcomp = document.createElement("span");
                                    icDelAcomp.setAttribute("class", "glyphicon glyphicon-minus-sign red delItem_" + kAcompPers);
                                    icDelAcomp.style.display = "none";
                                    icDelAcomp.onclick       = function () {
                                        deletarProdutoPersonalizadoDetalhe(carinhoItemId, kAcompPers, kAcomp, element);
                                    };
                                    cell.appendChild(icDelAcomp);
                                    var icDelStopAcomp = document.createElement("span");
                                    icDelStopAcomp.setAttribute("class", "glyphicon glyphicon-ban-circle delStopItem_" + kAcompPers);
                                    cell.appendChild(icDelStopAcomp);
                                    var cell           = row.insertCell(-1);
                                    var countItemAcomp = document.createElement("span");
                                    countItemAcomp.setAttribute("id", "countItemAcomp_" + kAcompPers + "_" + kAcomp);
                                    countItemAcomp.innerText = countAcomp;
                                    cell.appendChild(countItemAcomp);
                                    var cell       = row.insertCell(-1);
                                    var icAddAcomp = document.createElement("span");
                                    icAddAcomp.setAttribute("class", "glyphicon glyphicon-plus-sign green addItem_" + kAcompPers);
                                    icAddAcomp.onclick = function () {
                                        inserirProdutoPersonalizadoDetalhe(carinhoItemId, itemAcompanhamento, kAcompPers, kAcomp, element);
                                    };
                                    cell.appendChild(icAddAcomp);
                                    var icAddStopAcomp = document.createElement("span");
                                    icAddStopAcomp.setAttribute("class", "glyphicon glyphicon-ban-circle addStopItem_" + kAcompPers);
                                    icAddStopAcomp.style.display = "none";
                                    cell.appendChild(icAddStopAcomp);
                                }
                            );
                        }
                    );
                    if (produtoObj.Opcoes.length > 0) {
                        opcoes.dialog("open");
                    } else {
                        acompanhamentosPersonalizados.dialog("open");
                    }
                }
            } else {
                alert(dataObj.erro);
            }
        }
    );
}

/* Função responsável por inserir os produtos personalizados no array */
function inserirProdutoPersonalizadoDetalhe(carinhoItemId, itemAcompanhamento, kAcompPers, kAcomp, element) {
    var countItemAcomp = document.getElementById("countItemAcomp_" + kAcompPers + "_" + kAcomp);
    if (countItemAcomp.innerText <= element.qtd_escolha) {
        countAddItem(kAcompPers, kAcomp);
        stsObrigatorio = false;
        if (element.sts_cobrar_acomp == 0) {
            itemAcompanhamento.val_acompanhamento = "0";
        }
        carrinho[carinhoItemId]['Acompanhamentos'].push(itemAcompanhamento);
        var carrinhoCell            = document.getElementById("idProduto_" + carinhoItemId);
        var totalProduto            = calcularTotalProduto(carrinho[carinhoItemId]);
        carrinhoCell.innerHTML      = "R$" + totalProduto.replace(".", ",");
        var totalCarrinhoSpan       = document.getElementById("totalCarrinhoSpan");
        totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
        $(".delItem_" + kAcompPers).show();
        $(".delStopItem_" + kAcompPers).hide();
        if (element.qtd_escolha > 0 && element.qtd_escolha != 50) {
            countAddItemAcompPer(kAcompPers, element);
        } else {
            element.qtd_escolha = 50; // Para qtd_escolha == 0
            countAddItemAcomp(kAcompPers, element);
        }
    }
}

/* Função responsável por deletar os produtos personalizados no array */
function deletarProdutoPersonalizadoDetalhe(carinhoItemId, kAcompPers, kAcomp, element) {
    var countItemAcomp = document.getElementById("countItemAcomp_" + kAcompPers + "_" + kAcomp);
    if (countItemAcomp.innerText != 0) {
        countDelItem(kAcompPers, kAcomp);
        stsObrigatorio = true;
        carrinho[carinhoItemId]['Acompanhamentos'].pop();
        var carrinhoCell            = document.getElementById("idProduto_" + carinhoItemId);
        var totalProduto            = calcularTotalProduto(carrinho[carinhoItemId]);
        carrinhoCell.innerHTML      = "R$" + totalProduto.replace(".", ",");
        var totalCarrinhoSpan       = document.getElementById("totalCarrinhoSpan");
        totalCarrinhoSpan.innerHTML = "R$" + calcularTotalCarrinho().replace(".", ",");
        if (element.qtd_escolha > 0 && element.qtd_escolha != 50) {
            countDelItemAcompPer(kAcompPers, element);
        } else {
            element.qtd_escolha = 50; // Para qtd_escolha == 0
            countDelItemAcomp(kAcompPers, element);
        }
    }
}

function inserirObservacaoProduto(id, observacao) {
    // var produto            = inserirObservacao.data("obsData");
    var produto            = inserirObservacao.data(id);
    produto.txt_observacao = observacao;
}

function cancelarProduto(itemId, produto) {
    var row = document.getElementById("idProduto_" + itemId).parentNode;
    deletarProdutoCarrinho(row, produto);
}
/****** <- CARRINHO ****************/

/**
 * Função responsável por finalizar o pedido
 * Se o usuário tiver logado, direciona para a tela de cadastro do pedido
 **/
function finalizarPedido() {
    $.post(
        "/pedido/salvar-pedido",
        {pedido: carrinho},
        function (data) {
            var login = JSON.parse(data);
            if (!login) {
                window.location = "/login/login";
            } else {
                window.location = "/pedido/cadastrar-pedido";
            }
        }
    );
}
