<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Aqruivo de inicialização do sistema.
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
require '../vendor/autoload.php'; // Autoload do vendor
Twig_Autoloader::register();

$router = new \Core\Router(); // Classe de rotas
// Métodos que adicionam as rotas no sistema
$router->addRoute('', array('controller' => 'Endereco', 'action' => 'consultarCep')); // Rota default
$router->addRoute('{controller}/{action}'); // Pradrão de rota
$router->addRoute('{controller}/{action}/{id:\d+}'); // Padrão de rota com id
$url = $_SERVER['QUERY_STRING']; //resquisição url
$router->dispatch($url); // Método responsável por direcionar a rota ao seu respectivo Controller

