<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por executar métodos aplicados ao endereço
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace App\Controllers;

use App\Models\EnderecoModel;
use App\Services\SessionService as Session;
use Core\View;

/**
 * Class Endereco
 * @package App\Controllers
 */
class Endereco extends \Core\Controller
{
    /**
     * Método responsável por buscar endereço do CEP informado
     * @return jason object
     */
    public function consultarCepAction()
    {
        $endereco = Session::getEndereco();
        if (null === $endereco) {
            if ($this->isPost()) {
                $arrCep = $this->getParams();
                $mEndereco = new EnderecoModel();
                $endereco = $mEndereco->consultarCep($arrCep['cep']);
                print $endereco;
            } else {
                $usuario = Session::getUsuario();
                View::renderTemplate('Endereco/index.html', array('usuario' => $usuario));
            }
        } else {
            header('Location: /loja/buscar-loja-delivery');
        }
    }

    /**
     * Método responsável em cadastrar endereço no sistema
     * @return mixed
     */
    public function salvarEnderecoSessaoAction()
    {
        if ($this->isPost()) {
            $arrEndereco = $this->getParams();
            $mEndereco = new EnderecoModel();
            $boolean = $mEndereco->salvarEnderecoSessao($arrEndereco);
            print $boolean;
        } else {
            print json_encode(false);
        }
    }

    /**
     * Método responsável por cadastrar endereço na base de dados.
     */
    public function cadastrarEnderecoAction()
    {
        $usuario = Session::getUsuario();
        if (!is_null($usuario)) {
            if ($this->isPost()) {
                $arrEndereco = $this->getParams();
                $mEndereco = new EnderecoModel();
                $endereco = $mEndereco->cadastrarEndereco($arrEndereco);
                print $endereco;
            } else {
                View::renderTemplate('Endereco/cadastrar-endereco.html', array('usuario' => $usuario));
            }
        }
    }

    public function alterarEnderecoAction()
    {
        Session::setEndereco(null);
        header('Location: /');
    }
}
