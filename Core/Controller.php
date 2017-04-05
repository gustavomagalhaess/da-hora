<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe abstrata das Controllers
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace Core;

use \App\Services\SessionService as Session;
use Core\View;

/**
 * Classe Controller
 * @package Core
 */
abstract class Controller
{
    /**
     * Parâmetros de querlaquer instância de App\Controller
     * @var array
     */
    protected $params = array();

    /**
     * Parâmetros de mensagens de alerta
     * @var array
     */
    static protected $message = array();

    /**
     * Método contrutor da classe instanciada.
     * @param $params
     */
    public function __construct($params)
    {
        $this->params = $params;
    }

    /**
     * Método responsável por chamar funções não acessíveis
     * @param $name string
     * @param $args array
     * @return void
     */
    public function __call($name, $args)
    {
        $method = $name . 'Action';

        if (method_exists($this, $method)) {
            if ($this->before() !== false) {
                call_user_func_array(array($this, $method), $args);
                $this->after();
            } else {
                View::renderTemplate('Error/500.html');
            }
        } else {
            View::renderTemplate('Error/404.html');
        }
    }

    /**
     * Método a ser executado antes da chamada da função
     */
    protected function before()
    {
        Session::sessionStart();
        //Session::isLoginSessionExpired() ? Session::logout() : '';

    }

    /**
     * Método a ser executado depois da chamada da função
     */
    protected function after()
    {
    }

    /**
     * Método que verifica se a requisição é do tipo post
     * @return bool
     */
    protected function isPost()
    {
        if (!empty($_POST)) {
            $this->params = $_POST;
            return true;
        }
        return false;
    }

    /**
     * Método responsável por retornar os parametros passados pela url
     * @return array
     */
    protected function getParams()
    {
        return $this->params;
    }

    /**
     * Método responsável por pegar os parâmetros de mensagem
     * @return array
     */
    public static function getMessage()
    {
        return self::$message;
    }

    /**
     * Método responsávem por carregar os parâmetros de mensagens
     * @param array $message
     */
    public static function setMessage($message)
    {
        self::$message = $message;
    }
}
