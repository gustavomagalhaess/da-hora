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
namespace App\Services;


class CartaoService extends \Core\Service
{
    /**
     * Método responsável por buscar cartão cadastrado no sistema
     * @param $numSeqUsuario interger
     * @return mixed
     */
    public function buscarCartao($numSeqUsuario)
    {
        $service = 'BuscaCartao.php';
        $array = array(
            'num_seq_usuario' => $numSeqUsuario,
        );
        return $this->callWebservice($service, $array);
    }

    /**
     * Método responsável por buscar o tipo do cartão cadastrado no sistema
     * @param $numSeqLoja integer
     * @return mixed
     */
    public function buscarTipoCartao($numSeqLoja)
    {
        $service = 'buscaTipoCartao.php';
        $array = array(
            'num_seq_loja' => $numSeqLoja,
        );
        return $this->callWebservice($service, $array);
    }

    /**
     * Método responsável por cadastrar cartão no sistema
     * @param $arrCartao array
     * @return mixed
     */
    public function cadastrarCartao($arrCartao)
    {
        $service = 'cadastraCartao.php';
        $array = array(
            'num_seq_usuario'  => $arrCartao['num_seq_usuario'],
            'num_seq_tipo'     => $arrCartao['num_seq_tipo'],
            'nom_titular'      => $arrCartao['nom_titular'],
            'num_ano_validade' => $arrCartao['num_ano_validade'],
            'num_mes_validade' => $arrCartao['num_mes_validade'],
            'num_cartao'       => $arrCartao['num_cartao1'].$arrCartao['num_cartao2'].$arrCartao['num_cartao3'].$arrCartao['num_cartao4'],
        );
        return $this->callWebservice($service, $array);
    }
}