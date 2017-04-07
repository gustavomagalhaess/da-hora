<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por executar métodos aplicados ao usuario
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace App\Models;

use App\Services\SessionService as Session;
use App\Services\UsuarioService;
use App\Services\EnderecoService;
use App\Services\CartaoService;
use App\Services\LojaService;

/**
 * Class UsuarioModel
 * @package Model
 */
class UsuarioModel
{
    /**
     * Método responsável por instanciar o objeto UsuarioService
     * @return UsuarioService
     */
    private function getService()
    {
        return new UsuarioService();
    }

    /**
     * Metodo responsável por fazer o cadastro do usuário no sistema
     * @return void
     */
    public function cadastarUsuario($arrUsuario)
    {
        $usuario = $this->getService()->cadastarUsuario($arrUsuario);

        return $usuario;
    }

    /**
     * Metodo responsável por recuperar dados de usuário
     * @return void
     */
    public function dadosUsuario()
    {
        $usuario = Session::getUsuario();
        $sEndereco = new EnderecoService();
        $enderecos = json_decode($sEndereco->buscarEndereco($usuario['id']));
        /*if (!$enderecos->sucesso) {
            throw new \Exception($enderecos->erro);
        }*/
        $sCartao = new CartaoService();
        $cartoes = json_decode($sCartao->buscarCartao($usuario['id']));
        /*if (!$cartoes->sucesso) {
            throw new \Exception($cartoes->erro);
        }*/
        $loja = Session::getLoja();
        if (isset($loja)) {
            $sLoja = new LojaService();
            $ultimosPedidos = json_decode(
                $sLoja->listarPedidos($usuario['id'], $loja['num_seq_loja'])
            );
        }
        $arrDadosUsuario = array(
            'usuario'        => $usuario,
            'enderecos'      => isset($enderecos->Endereco) ? (array)$enderecos->Endereco : null,
            'cartoes'        => isset($cartoes->cartao) ? (array)$cartoes->cartao : null,
            'ultimosPedidos' => isset($ultimosPedidos->Pedidos) ? (array)$ultimosPedidos->Pedidos : null,
            'mensagem'       => isset($arrMensagem) ? $arrMensagem : null,
        );

        return $arrDadosUsuario;
    }
}