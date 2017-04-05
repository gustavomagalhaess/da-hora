<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe responsável por designar qual tarefa executar dependendo da requisição
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */ 
namespace Core;

/**
 * Class View
 * @package Core
 */
class View {
	
	/**
	 * Método responsável por renderizar os templates
	 */
	public static function renderTemplate($template, $args = array())
	{
		static $twig = null;
		if (is_null($twig)) {
			$loader = new \Twig_Loader_Filesystem(dirname(__DIR__).'/App/Views');
			$twig = new \Twig_Environment($loader);
		}
		echo $twig->render($template, $args);
	}
}
 