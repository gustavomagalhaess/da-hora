<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe de sessão
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */

namespace App\Services;

/**
 * Class Session
 * @package Core
 */
class SessionService extends \Core\Service
{
    static public function sessionStart()
    {
        if (session_start()) {
            return true;
        }

        return false;
    }

    static public function getSession()
    {
        return isset($_SESSION) ? $_SESSION : null;
    }

    static public function logout()
    {
        session_destroy();
    }

    static public function setUsuario($usuario)
    {
        $_SESSION["user_id"] = $usuario['id'];
        $_SESSION['loggedin_time'] = time();
        $_SESSION['usuario'] = $usuario;
    }

    static public function getUsuario()
    {
        return isset($_SESSION['usuario']) ? $_SESSION['usuario'] : null;
    }

    static public function setEndereco($endereco)
    {
        $_SESSION['endereco'] = $endereco;
    }

    static public function getEndereco()
    {
        return isset($_SESSION['endereco']) ? $_SESSION['endereco'] : null;
    }

    static public function setcep($cep)
    {
        $_SESSION['endereco']['cep'] = $cep;
    }

    static public function getCep()
    {
        return isset($_SESSION['endereco']['cep']) ? $_SESSION['endereco']['cep'] : null;
    }

    static public function setVlDelivery($vlDelivery)
    {
        $_SESSION['endereco']['vl_delivery'] = $vlDelivery;
    }

    static public function getVlDelivery()
    {
        return isset($_SESSION['endereco']['vl_delivery']) ? $_SESSION['endereco']['vl_delivery'] : null;
    }

    static public function setLoja($loja)
    {
        $_SESSION['loja'] = $loja;
    }

    static public function getLoja()
    {
        return isset($_SESSION['loja']) ? $_SESSION['loja'] : null;
    }

    static public function setPedido($pedido)
    {
        $_SESSION['pedido'] = $pedido;
    }

    static public function getPedido()
    {
        return isset($_SESSION['pedido']) ? $_SESSION['pedido'] : null;
    }

    static public function isLoginSessionExpired()
    {
//        var_dump($_SESSION['loggedin_time']);
//        var_dump($_SESSION["user_id"]);
        $login_session_duration = 1;
        $current_time = time();
        if (isset($_SESSION['loggedin_time']) && isset($_SESSION["user_id"])) {
            if ((($current_time - $_SESSION['loggedin_time']) > $login_session_duration)) {
                return true;
            }
        }
        return false;
    }
}