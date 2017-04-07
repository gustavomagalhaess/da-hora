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
namespace App\Controllers;

use App\Models\PedidoModel;
use App\Services\SessionService as Session;
use Core\View;
/**
 * Class Pedido
 * @package App\Controllers
 */
class Pedido extends \Core\Controller
{
    /**
     * Método responsável por fazer cadastro do pedido
     * @return void
     */
    public function cadastrarPedidoAction()
    {
        $usuario = Session::getUsuario();
        if (null !== $usuario) {
            $pedidos = Session::getPedido();
            if (null !== $pedidos) {
                $mPedido = new PedidoModel();
                //$mPedido->verificarPedido($pedido);
                $arrPedido = $mPedido->cadastrarPedido($usuario, $pedidos);
                $arrPedido['endereco'] = Session::getEndereco();
                View::renderTemplate('Pedido/cadastrar-pedido.html', $arrPedido);
            } else {
                $endereco = Session::getEndereco();
                if (null !== $endereco) {
                    header('Location: /loja/buscar-loja-delivery');
                } else {
                    header('Location: /');
                }
            }
        } else {
            header('Location: /login/login');
        }
    }

    /**
     * Método responsavel por salvar o pedido da loja
     * @return boolean
     */
    public function salvarPedidoAction()
    {
        if ($this->isPost()) {
            $arrPedido = $this->getParams();
            $mPedido = new PedidoModel();
            $pedido = $mPedido->salvarPedido($arrPedido);

            print $pedido;
        }
    }
}