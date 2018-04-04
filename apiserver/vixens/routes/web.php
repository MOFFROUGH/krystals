<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->get('/images', 'User\UserController@index');
$router->get('/search', 'User\UserController@searchVixens');
$router->get('/images/{id}', 'User\UserController@OneVixen');
$router->post('/register', 'User\UserController@register');
$router->get('/pay/success',[
    'as'=> 'successPaypal',
    'uses'=>'User\UserController@success'
]);
// $router->get('/pay/cancel',[
//     'as'=>'cancelPaypal',
//     'uses'=>'User\UserController@cancel'
// ]);
