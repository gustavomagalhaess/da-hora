<?php
/**
 * Aplicação de delivery web online Restaurante Da Hora.
 *
 * Classe de rotas responsável por ligar as rotas aos Controllers\Actions
 *
 * PHP version 5.3
 *
 * @author     Gustavo Magalhaes <gustavo.magalhaess@gmail.com>
 * @version    1.0.0
 * @since      2017
 */
namespace Core;

use Core\View;
/**
 * Class Router
 * @package Core
 */
class Router
{
    /**
     * Array que contêm as rotas
     * @var array
     */
    protected $routes = array();

    /**
     * Array que contem os parâmetros das rotas
     * @var array
     */
    protected $params = array();

    /**
     * Método responsável por adicionar as rotas e seus respectivos parâmetros
     * @param $route
     * @param $params
     * @return void
     */
    public function addRoute($route, $params = array())
    {
        $route = preg_replace('/\//', '\\/', $route);
        $route = preg_replace('/\{([a-z]+)\}/', '(?P<\1>[a-z-]+)', $route);
        $route = preg_replace('/\{([a-z]+):([^\}]+)\}/', '(?P<\1>\2)', $route);
        $route = '/^' . $route . '$/i';
        $this->routes[$route] = $params;
    }

    /**
     * Método responsável por retornar todas as rotas que fora adicionadas por addRoutes()
     * @return array
     */
    public function getRoutes()
    {
        return $this->routes;
    }

    /**
     * Método responsável por checar se a rota solicitada existe em $this->routes
     * @param $url string
     * @return bool
     */
    public function match($url)
    {
        foreach ($this->routes as $route => $params) {
            if (preg_match($route, $url, $matches)) {
                foreach ($matches as $key => $match) {
                    if (is_string($key)) {
                        $params[$key] = $match;
                    }
                }
                $this->params = $params;
                return true;
            }
        }
        return false;
    }

    /**
     * Método responsável por instanciar classes e chamar métodos
     * @param $url string
     * @return void
     */
    public function dispatch($url)
    {
        $url = $this->removeQueryStringVariables($url);
        if ($this->match($url)) {
            $controller = $this->params['controller'];
            $controller = 'App\Controllers\\'.$this->convertToPascalCase($controller);
            if (class_exists($controller)) {
                $objController = new $controller($this->params);
                $action = $this->params['action'];
                $action = $this->convertToCamelCase($action);
                if (is_callable(array($objController, $action))) {
                    $objController->$action();
                } else {
                    View::renderTemplate('Error/404.html');
                }
            } else {
                View::renderTemplate('Error/404.html');
            }
        } else {
            View::renderTemplate('Error/404.html');
        }
    }

    /**
     * Método responsável por converter classes na forma PascalCase
     * @return string
     */
    private function convertToPascalCase($class) {
        return str_replace(' ', '', ucwords(str_replace('-', ' ', $class)));
    }

    /**
     * Método responsável por converter classes na forma camelCase
     * @return string
     */
    private function convertToCamelCase ($method) {
        return lcfirst($this->convertToPascalCase($method));
    }

    /**
     * Método responsável por remover variávels da query_string vindas da url
     * @param $url string
     * @return string
     */
    private function removeQueryStringVariables($url) {
        $parts = explode('&', $url);
        if (strpos($parts[0], '=') === false) {
            $url = $parts[0];
        } else {
            $url = '';
        }
        return $url;
    }
}
