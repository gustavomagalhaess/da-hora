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

use App\Services\SessionService as Session;
use App\Services\LojaService;
/**
 * Class LojaModel
 * @package App\Models
 */
class LojaModel
{
    protected $carrinho = array();

    /**
     * Método responsável por instanciar o objeto LojaService
     * @return LojaService
     */
    private function getService()
    {
        return new LojaService();
    }

    /**
     * Método responsável por buscar a loja
     * @param $cep
     * @return mixed
     */
    public function buscarLojaDelivery($cep)
    {
        $cep = str_replace(array('.', '-'), '', $cep);
        $loja = json_decode($this->getService()->buscarLojaDelivery($cep));

        $loja = (object) array(
            'sucesso'      => true,
            'num_seq_loja' => 5,
            'vl_delivery'  => 1,
        );

        if (!$loja->sucesso) {
            throw new \Exception($loja->erro);
        } else {
            Session::setLoja(array('num_seq_loja' => $loja->num_seq_loja));
        }
        $detalhes = json_decode($this->detalharLoja(isset($loja->num_seq_loja) ? $loja->num_seq_loja : $_SESSION['loja']['num_seq_loja']));
        if (!$detalhes->sucesso) {
            throw new Exception($detalhes->erro);
        }
        $categorias = json_decode($this->buscarCategorias(isset($loja->num_seq_loja) ? $loja->num_seq_loja : $_SESSION['loja']['num_seq_loja']));
        if (!$categorias->sucesso) {
            throw new Exception($categorias->erro);
        }
        $cartoes = json_decode($this->buscarTipoCartao(isset($loja->num_seq_loja) ? $loja->num_seq_loja : $_SESSION['loja']['num_seq_loja']));
        if (!$detalhes->sucesso) {
            throw new Exception($cartoes->erro);
        }
        Session::setVlDelivery(array('vl_delivery' => $loja->vl_delivery));

        $arrLoja = array(
            'loja' => $loja,
            'detalhes' => $detalhes->loja,
            'categorias' => $categorias,
            'cartoes' => $cartoes
        );

        return $arrLoja;
    }

    /**
     * Método responsávem por retornar os detalhes da loja
     * @param $numSeqLoja
     * @return mixed
     */
    private function detalharLoja($numSeqLoja)
    {
        $detalharLoja = $this->getService()->detalharLoja($numSeqLoja);
        return $detalharLoja;
    }

    /**
     * Método responsávem por retornar as categorias da loja
     * @param $numSeqLoja
     * @return mixed
     */
    private function buscarCategorias($numSeqLoja)
    {
        $categorias = $this->getService()->buscarCategorias($numSeqLoja);
        return $categorias;
    }

    /**
     * Método responsavel por retornar tipos de cartões aceitos da loja
     * @param $arrCategoria
     * @return mixed
     */
    private function buscarTipoCartao($numSeqLoja)
    {
        $cartoes = $this->getService()->buscarTipoCartao($numSeqLoja);
        return $cartoes;
    }

    /**
     * Método responsavel por retornar lista de produtos por categoria da loja
     * @param $arrCategoria
     * @return mixed
     */
    public function buscarProdutoLista($arrCategoria)
    {
        $produtos = $this->getService()->buscarProdutoLista($arrCategoria);
        return $produtos;
    }

    /**
     * Método responsavel por retornar detalhes do produto da loja
     * @param $arrCategoria
     * @return mixed
     */
    public function buscarProdutoCardapio($arrProduto)
    {
        $detalhesProdutos = $this->getService()->buscarProdutoCardapio($arrProduto);
        return $detalhesProdutos;
    }
}