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
namespace App\Models;

use App\Services\LoginService;
/**
 * Class LoginModel
 * @package App\Models
 */
class LoginModel
{
    /**
     * Método responsável por instanciar o objeto LoginService
     * @return LojaService
     */
    private function getService()
    {
        return new LoginService();
    }

    /**
     * Método responsável por realizar login do sistema
     * @return void
     */
    public function login($arrLogin)
    {
        $login = json_decode($this->getService()->login($arrLogin));
        if ($login->logado) {
            \App\Services\SessionService::setUsuario((array)$login);
        }
        return json_encode($login);
    }
}