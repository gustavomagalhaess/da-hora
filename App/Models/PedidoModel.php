<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por executar métodos aplicados à pedido
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace App\Models;

use App\Services\PedidoService;
use App\Services\LojaService;
use App\Services\SessionService as Session;

/**
 * Class PedidoModel
 * @package App\Models
 */
class PedidoModel
{
    /**
     * Método responsável por instanciar o objeto PedidoService
     * @return PedidoService
     */
    private function getService()
    {
        return new PedidoService();
    }

    /**
     * Método responsavel por salvar o pedido da loja
     * @return boolean
     */
    public function salvarPedido($arrPedido)
    {
        Session::setPedido($arrPedido);
        $usuario = Session::getUsuario();

        return json_encode(isset($usuario) ? true : false);
    }

    /**
     * Método responsável por fazer cadastro do pedido
     * @return void
     */
    public function cadastrarPedido($usuario, $pedidos)
    {
        $loja = Session::getLoja();
        $formasPagamento = json_decode($this->getService()->finalizarPedido($usuario, $loja));

        if (!$formasPagamento->sucesso) {
            $formasPagamento = $formasPagamento->erro;
        }

        /*$enderecos = json_decode($this->getService()->buscarEndereco($usuario));
        if (!$enderecos->sucesso) {
            $enderecos = $enderecos->erro;
        }*/

        $cartoes = json_decode($this->getService()->buscarCartao($usuario));
        if (!$cartoes->sucesso) {
            $cartoes = $cartoes->erro;
        }

        $tipoCartoes = json_decode($this->getService()->buscarTipoCartao($loja));
        if (!$tipoCartoes->sucesso) {
            $tipoCartoes = $tipoCartoes->erro;
        }

        $endereco = Session::getEndereco();

        $arrayDados = array(
            'usuario'         => $usuario,
            'loja'            => isset($loja) ? $loja : null,
            'endereco'        => isset($endereco) ? $endereco : null,
            'cartoes'         => isset($cartoes) ? $cartoes->cartao : null,
            'tipoCartoes'     => isset($tipoCartoes) ? $tipoCartoes->tipoCartao : null,
            'pedidos'         => isset($pedidos) ? $pedidos : null,
            'formasPagamento' => isset($formasPagamento) ? (array)$formasPagamento : null,
        );

        return $arrayDados;
    }

    /**
     * Método responsável em verificar se o produto vindo da sessão corresponde com o produto cadastrado na loja
     * @param $arrPedido
     */
    public function verificarPedido($arrPedido)
    {
        $sLoja = new LojaService();
        echo '<pre>';
        foreach ($arrPedido['pedido'] as &$pedido) {
            $arrProduto = array(
                'num_seq_loja'    => $pedido['produto']['num_seq_loja'],
                'num_seq_produto' => $pedido['produto']['num_seq_produto'],
            );
            $objProduto = json_decode($sLoja->buscarProdutoCardapio($arrProduto));
            $pedido['produto']['val_produto_desconto'] = $objProduto->Produto->val_produto_desconto;
            //            if (isset($pedido['Opcoes']) && !empty($pedido['Opcoes'])) {
            //            }
            if (isset($pedido['Acompanhamentos']) && !empty($pedido['Acompanhamentos'])) {
                foreach ($pedido['Acompanhamentos'] as &$acompanhamento) {
                    foreach ($objProduto->AcompanhamentosPersonalizados as $acompanhamentoPersonalizado) {
                        if ($acompanhamentoPersonalizado->sts_cobrar_acomp == 1) { // Cobrar Preço
                            foreach ($acompanhamentoPersonalizado->Acompanhamentos as $objAcompanhamento) {

                                $value = array_search(
                                    $acompanhamento['num_seq_acompanhamento'],
                                    (array)$objAcompanhamento
                                );
                                var_dump($value);

                                if ($acompanhamento['num_seq_acompanhamento'] == $objAcompanhamento->num_seq_acompanhamento) {
                                    $acompanhamento['nom_acompanhamento'] = $objAcompanhamento->nom_acompanhamento;
                                    $acompanhamento['val_acompanhamento'] = $objAcompanhamento->val_acompanhamento;
                                }
                            }
                        }
                    }
                }
            }
        }
        unset($pedido);
        unset($acompanhamento);
        //var_dump($arrPedido['pedido']);
        die;
    }
}