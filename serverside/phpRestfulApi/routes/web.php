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
    return response()->json([
        'message' => 'This should be work fine too',
    ]);
});

$router->get('/sqlTest', function () use ($router) {
  $persons = DB::connection('mysql')->select('SELECT * FROM dbo.Persons');
  return response()->json([
    'message' => 'This should be work fine too',
    'persons' => $persons
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
