<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return response()->json([
        'message' => 'This should be work fine ',
    ]);
});

$router->get('/test', function () use ($router) {
   'as' => 'test','uses' => 'Controller@test'
    return response()->json([
        'message' => 'This should be work fine ',
    ]);
});

$router->get('/grades', function() use ($router) {
    $getGrades = DB::connection('sqlsrv')->select('SELECT * FROM Grades');
    
    if ($getGrades) {
        return response()->json($getGrades);
    } else {
        return response()->json([
            'message' => 'No data found',
        ]);
    }
});
