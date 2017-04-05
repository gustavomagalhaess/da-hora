<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por executar métodos aplicados à loja
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace App\Controllers;

use App\Models\LojaModel;
use App\Services\SessionService as Session;
use Core\View;
/**
 * Class Loja
 * @package App\Controllers
 */
class Loja extends \Core\Controller
{
    /**
     * Método responsável por buscar a loja
     * @return void
     */
    public function buscarLojaDeliveryAction()
    {
        $endereco = Session::getEndereco();
        $cep = $endereco['num_cep'] = '70384090'; //retirar
        if (!empty($cep)) {
            try {
                $mLoja = new LojaModel();
                $arrLoja = $mLoja->buscarLojaDelivery($cep);
                $usuario = Session::getUsuario();
                $arrLoja = array_merge($arrLoja, array('usuario' => $usuario), array('endereco' => $endereco));
                View::renderTemplate('Loja/index.html', $arrLoja);
            } catch (\Exception $e) {
                View::renderTemplate('Error/500.html');
            }
        } else {
            header('Location: /');
        }
    }

    /**
     * Método responsavel por retornar lista de produtos por categoria da loja
     * @return void
     */
    public function buscarProdutoListaAction()
    {
        if ($this->isPost()) {
            $arrCategoria = $this->getParams();
            $mLoja = new LojaModel();
            $arrProduto = $mLoja->buscarProdutoLista($arrCategoria);
            print $arrProduto;
        }
    }

    /**
     * Método responsavel por retornar detalehs do produto da loja
     * @return void
     */
    public function buscarProdutoCardapioAction()
    {
        if ($this->isPost()) {
            $arrProduto = $this->getParams();
            $mLoja = new LojaModel();
            $arrDetalhesProduto = $mLoja->buscarProdutoCardapio($arrProduto);
            print $arrDetalhesProduto;
        }
    }

    /**
     * Método responsavel por salvar o pedido da loja
     * @return void
     */
    public function salvarPedidoAction()
    {
        if ($this->isPost()) {
            $arrPedido = $this->getParams();
            $mLoja = new LojaModel();
            $return = $mLoja->salvarPedidoAction($arrPedido);
            print $return;
        }
    }

    /**
     * Método responsável por adicionar item no carrinho
     */
    public function adicionarItemCarrinhoAction()
    {
        $arrItem = $this->getParams();
        Session::setPedido($arrItem);
    }
}