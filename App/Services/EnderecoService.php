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
 * Class EnderecoService
 * @package App\Services
 */
class EnderecoService extends \Core\Service
{
    /**
     * Método responsável por consultar endereço no sistema
     * @param $cep interger
     * @return mixed
     */
    public function consultarCep($cep)
    {
        $service = 'cep.php';
        $array = array('cep' => $cep);
        return $this->callWebService($service, $array);
    }

    /**
     * Método responsável em cadastrar endereço no sistema
     * @param $arrEndereco array
     * @return mixed
     */
    public function cadastrarEndereco($arrEndereco)
    {
        $service = 'CadastraEndereco.php';
        $array = array(
            'num_seq_usuario' => $arrEndereco['num_seq_usuario'],
            'num_geocodigo'   => $arrEndereco['num_geocodigo'],
            'dsc_endereco'    => $arrEndereco['dsc_endereco'],
            'nom_bairro'      => $arrEndereco['nom_bairro'],
            'num_endereco'    => $arrEndereco['num_endereco'],
            'dsc_complemento' => $arrEndereco['dsc_complemento'],
            'num_cep'         => $arrEndereco['num_cep'],
            'dsc_titulo'      => $arrEndereco['dsc_titulo'],
        );
        return $this->callWebservice($service, $array);
    }

    /**
     * Métdodo responsávem por buscar endereço cadastrado no sistema
     * @param $numSeqUsuario integer
     * @return mixed
     */
    public function buscarEndereco($numSeqUsuario)
    {
        $service = 'buscaEndereco.php';
        $array = array(
            'num_seq_usuario' => $numSeqUsuario,
        );
        return $this->callWebservice($service, $array);
    }
}