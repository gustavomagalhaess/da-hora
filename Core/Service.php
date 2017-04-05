<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por fazer conexão com a webservice http://dubba.com.br/webservice/
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace Core;
/**
 * Classe Service
 * @package Core
 */
class Service
{
    /**
     * Chave de acesso à webService
     * @var string
     */
    private $sessionKey = 'd1deu34122dfa92a2729axz056f2a75e6agr00fe47236f4d637220c202307845';

    /**
     * Url de acesso do root da webService
     * @var string
     */
    private $urlService = 'http://dubba.com.br/webservice/';

    /**
     * Url de acesso do root da webService pelo IP
     * @var string
     */
    private $urlServiceIp = 'http://23.23.206.106/webservice/';

    /**
     * Função responsável em fazer chamada para a webService
     * @param $service
     * @param $array
     * @return mixed
     */
    protected function callWebService($service, $array)
    {
        $key = count($array) == 1 ? array_key_exists('cep', $array) : false;
        $array['chave'] = $this->sessionKey;
        $service = ($key ? $this->urlServiceIp : $this->urlService).$service;

        $call = curl_init($service);
        curl_setopt($call, CURLOPT_POST, 1);
        curl_setopt($call, CURLOPT_POSTFIELDS, $array);
        curl_setopt($call, CURLOPT_HTTPHEADER, $array);
        curl_setopt($call, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($call, CURLOPT_HEADER, 0);
        curl_setopt($call, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($call);
        return $response;
    }
}