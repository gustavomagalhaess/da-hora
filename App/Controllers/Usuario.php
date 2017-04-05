<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por executar métodos aplicados ao usuario
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace App\Controllers;

use App\Models\UsuarioModel;
use Core\View;

/**
 * Class Usuario
 * @package App\Controllers
 */
class Usuario extends \Core\Controller
{
    /**
     * Metodo responsável por fazer o cadastro do usuário no sistema
     * @return void
     */
    public function cadastarUsuarioAction()
    {
        if ($this->isPost()) {
            $arrUsuario = $this->getParams();
            $mUsuario = new UsuarioModel();
            $usuario = $mUsuario->cadastarUsuario($arrUsuario);
            print $usuario;
        } else {
            View::renderTemplate('Usuario/index.html');
        }
    }

    /**
     * Metodo responsável por recuperar dados de usuário
     * @return void
     */
    public function dadosUsuarioAction()
    {
        try {
            $usuario = \App\Services\SessionService::getUsuario();
            if (!is_null($usuario)) {
                $mUsuario = new UsuarioModel();
                $arrDadosUsuario = $mUsuario->dadosUsuario();
                View::renderTemplate('Usuario/dados-usuario.html', $arrDadosUsuario);
            } else {
                header('Location: /login/login');
            }
        } catch (\Exception $e) {
            header('Location: /');
        }
    }

}