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
namespace App\Models;

use App\Services\CartaoService;

/**
 * Classe CartaoModel
 * @package Model
 */
class CartaoModel
{
    /**
     * Método responsável por instanciar o objeto CartaoService
     * @return CartaoService
     */
    private function getService()
    {
        return new CartaoService();
    }

    /**
     * Método responsável por buscar cartão cadastrado no sistema
     * @param $numSeqUsuario interger
     * @return mixed
     */
    public function buscarCartao($numSeqUsuario)
    {
        $cartao = json_decode($this->getService()->buscarCartao($numSeqUsuario));
        return $cartao;
    }

    /**
     * Método responsável por buscar o tipo do cartão cadastrado no sistema
     * @param $numSeqLoja integer
     * @return mixed
     */
    public function buscarTipoCartao($numSeqLoja)
    {
        $cartao = json_decode($this->getService()->buscarTipoCartao($numSeqLoja));
        return $cartao;
    }

    /**
     * Método responsável por cadastrar cartão no sistema
     * @param $arrCartao array
     * @return mixed
     */
    public function cadastrarCartao($arrCartao)
    {
        $cartao = $this->getService()->cadastrarCartao($arrCartao);
        return $cartao;
    }
}