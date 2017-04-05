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

use App\Models\CartaoModel;
use Core\View;

/**
 * Class Cartao
 * @package App\Controllers
 */
class Cartao extends \Core\Controller
{
    /**
     * Método responsável por buscar cartão cadastrado no sistema
     * @return mixed
     */
    public function buscarCartaoAction()
    {
    }

    /**
     * Método responsável por buscar o tipo do cartão cadastrado no sistema
     * @return mixed
     */
    public function buscarTipoCartaoAction()
    {
    }

    /**
     * Método responsável por cadastrar cartão no sistema
     * @return mixed
     */
    public function cadastrarCartaoAction()
    {
        $usuario = \App\Services\SessionService::getUsuario();
        if (!is_null($usuario)) {
            if ($this->isPost()) {
                $mCartao = new CartaoModel();
                $arrCartao = $this->getParams();
                $cartao = $mCartao->cadastrarCartao($arrCartao);
                print $cartao;
            } else {
                View::renderTemplate('Cartao/index.html', array('usuario' => $usuario));
            }
        } else {
            header('Location: /login/login');
        }
    }
}