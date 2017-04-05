<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por manter endereço
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace App\Models;

use App\Services\EnderecoService;
use Core\Session;
/**
 * Class EnderecoModel
 * @package Model
 */
class EnderecoModel
{
    /**
     * Método responsável por instanciar o objeto LojaService
     * @return LojaService
     */
    private function getService()
    {
        return new EnderecoService();
    }

    /**
     * Método responsável por buscar endereço do CEP informado
     * @return mixed
     */
    public function consultarCep($cep)
    {
        $cep = str_replace(array('.', '-'), '', $cep);
        $endereco = $this->getService()->consultarCep($cep);
        return $endereco;
    }

    /**
     * Método responsável em salvar endereço na sessão
     * @param $arrEndereco array
     * @return mixed
     */
    public function salvarEnderecoSessao($arrEndereco)
    {
        if (!empty($arrEndereco)) {
            \App\Services\SessionService::setEndereco($arrEndereco);
            return json_encode(true);
        }
        return json_encode(false);
    }

    /**
     * Métdodo responsávem por cadastra endereço no sistema
     * @param $numSeqUsuario integer
     * @return mixed
     */
    public function cadastrarEndereco($arrEndereco)
    {
        $endereco = $this->getService()->cadastrarEndereco($arrEndereco);
        return $endereco;
    }
}