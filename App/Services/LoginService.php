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
namespace App\Services;

/**
 * Class LoginService
 * @package App\Services
 */
class LoginService extends \Core\Service
{
    /**
     * Método responsável por realizar login do sistema
     * @return void
     */
    public function login($arrLogin)
    {
        $service = 'LogaSistema.php';
        $array = array(
            'dsc_email' => $arrLogin['dsc_email'],
            'dsc_senha' => $arrLogin['dsc_senha'],
        );
        return $this->callWebService($service, $array);
    }
}