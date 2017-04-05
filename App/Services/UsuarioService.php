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
namespace App\Services;

/**
 * Class UsuarioService
 * @package App\Services
 */
class UsuarioService extends \Core\Service
{
    /**
     * Metodo responsável por fazer o cadastro do usuário no sistema
     * @return mixed
     */
    function cadastarUsuario($arrUsuario)
    {
        $service = 'registraUsuario.php';
        $array = array(
            'nome_usuario'  => $arrUsuario['nome_usuario'],
            'cpf_usuario'   => $arrUsuario['cpf_usuario'],
            'dsc_email'     => $arrUsuario['dsc_email'],
            'dsc_senha'     => $arrUsuario['dsc_senha'],
            'dsc_senha2'    => $arrUsuario['dsc_senha2'],
            'url_foto'      => $arrUsuario['url_foto'],
            'num_cel'       => $arrUsuario['num_cel'],
            'dsc_sexo'      => $arrUsuario['dsc_sexo'],
            'dt_nascimento' => $arrUsuario['dt_nascimento'],
        );

        return $this->callWebService($service, $array);
    }

    /**
     * Metodo responsável por buscar catrão do usuário cadastrado
     * @return mixed
     */
    public function buscarCartao($usuario)
    {
        $service = 'BuscaCartao.php';
        $array = array(
            'num_seq_usuario' => $usuario['id'],
        );

        return $this->callWebService($service, $array);
    }
}