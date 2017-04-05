<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por mandar parâmetros de requisição para a webservice
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace App\Services;

/**
 * Class LojaService
 * @package App\Services
 */
class LojaService extends \Core\Service
{
    public function buscarLojaDelivery($cep)
    {
        $service = 'BuscaLojaDelivery.php';
        $array = array(
            'num_seq_franquia' => 3,
            'cep'              => $cep,
        );
        return $this->callWebService($service, $array);
    }

    /**
     * Método responsávem por retornar os detalhes da loja
     * @param $numSeqLoja
     * @return mixed
     */
    public function detalharLoja($numSeqLoja)
    {
        $service = 'detalheLoja.php';
        $array = array(
            'num_seq_loja' => $numSeqLoja,
        );
        return $this->callWebService($service, $array);
    }

    /**
     * Método responsávem por retornar as categorias da loja
     * @param $numSeqLoja
     * @return mixed
     */
    public function buscarCategorias($numSeqLoja)
    {
        $service = 'buscaCategorias.php';
        $array = array(
            'num_seq_loja' => $numSeqLoja,
        );
        return $this->callWebService($service, $array);
    }

    /**
     * Método responsavel por retornar tipos de cartões aceitos da loja
     * @param $arrCategoria
     * @return mixed
     */
    public function buscarTipoCartao($numSeqLoja)
    {
        $service = 'buscaTipoCartao.php';
        $array = array(
            'num_seq_loja' => $numSeqLoja,
        );
        return $this->callWebService($service, $array);
    }

    /**
     * Método responsavel por retornar lista de produtos por categoria da loja
     * @param $arrCategoria
     * @return mixed
     */
    public function buscarProdutoLista($arrCategoria)
    {
        $service = 'buscaProdutoLista.php';
        $array = array(
            'num_seq_loja'      => $arrCategoria['num_seq_loja'],
            'num_seq_categoria' => $arrCategoria['num_seq_categoria'],
        );
        return $this->callWebService($service, $array);
    }

    /**
     * Método responsavel por retornar detalhes do produto da loja
     * @param $arrCategoria
     * @return mixed
     */
    public function buscarProdutoCardapio($arrProduto)
    {
        $service = 'buscaProdutoCardapio.php';
        $array = array(
            'num_seq_loja'    => $arrProduto['num_seq_loja'],
            'num_seq_produto' => $arrProduto['num_seq_produto'],
        );
        return $this->callWebService($service, $array);
    }

    /**
     * Metodo responsável por listar os pedidos efetuados pelo usuário
     * @return mixed
     */
    public function listarPedidos($numSeqUsuario, $numSeqLoja)
    {
        $service = 'buscaPedidoDetalhe.php';
        $array = array(
            'tipoOperacao'     => 'P',
            'num_seq_usuario'  => $numSeqUsuario,
            'num_seq_franquia' => $numSeqLoja,
        );
        return $this->callWebService($service, $array);
    }
}