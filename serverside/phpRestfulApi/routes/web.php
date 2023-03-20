<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return response()->json([
        'message' => 'This should be work fine ',
    ]);
});

$router->get('/grades', 'GradesController@index');
$router->get('/course', 'CourseController@index');
$router->get('/std', 'StudentController@index');
$router->get('/user', 'UserController@index');
$router->post('/login', 'UserController@login');

$router->put('/editSubject', 'SubjectController@edit');
$router->put('/editGrade', 'GradesController@edit');


$router->get('/api', function () {
    try {
        DB::connection()->getPdo();
        echo "Connection successful!";
    } catch (\Exception $e) {
        die("Could not connect to the database. Error: " . $e);
    }
});

