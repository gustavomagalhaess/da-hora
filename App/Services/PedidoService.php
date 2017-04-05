<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por executar métodos aplicados à pedido
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace App\Services;

/**
 * Class PedidoService
 * @package App\Services
 */
class PedidoService extends \Core\Service
{
    public function finalizarPedido($usuario, $loja)
    {
        $service = 'FinalizaPedido.php';
        $array = array(
            'num_seq_usuario' => 2,//$usuario['id'],
            'num_seq_loja'    => 9, //$loja['num_seq_loja'],
            'tp_tipo_entrega' => 1,
        );

        return $this->callWebService($service, $array);
    }

    public function buscarEndereco($usuario)
    {
        $service = 'buscaEndereco.php';
        $array = array(
            'num_seq_usuario' => $usuario['id'],
        );

        return $this->callWebService($service, $array);
    }

    public function buscarCartao($usuario)
    {
        $service = 'BuscaCartao.php';
        $array = array(
            'num_seq_usuario' => $usuario['id'],
        );

        return $this->callWebService($service, $array);
    }

    public function buscarTipoCartao($loja)
    {
        $service = 'buscaTipoCartao.php';
        $array = array(
            'num_seq_loja' => $loja['num_seq_loja'],
        );

        return $this->callWebService($service, $array);
    }
}