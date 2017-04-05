<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por executar métodos aplicados a login
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace App\Controllers;

use App\Models\LoginModel;
use Core\View;
/**
 * Class Login
 * @package App\Controllers
 */
class Login extends \Core\Controller
{

    /**
     * Método responsável por realizar login do sistema
     * @return void
     */
    public function loginAction()
    {
        $usuario = \App\Services\SessionService::getUsuario();
        if (null === $usuario) {
            if ($this->isPost()) {
                    $arrLogin = $this->getParams();
                    $mLogin = new LoginModel();
                    $login = $mLogin->login($arrLogin);
                    print $login;
            } else {
                View::renderTemplate('login/index.html');
            }
        } else {
            header('Location: /pedido/cadastrar-pedido');
        }
    }

    /**
     * Método responsável por realizar logout do sistema
     * @return void
     */
    public function logoutAction()
    {
        \App\Services\SessionService::logout();
        header('Location: /');
    }
}