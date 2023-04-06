<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return response()->json([
        'message' => 'This should be work fine ',
    ]);
});

$router->get('/php', function () use ($router) {
  return phpinfo();
});

$router->get('/grades', 'GradesController@index');
$router->get('/course', 'CourseController@index');
$router->get('/std', 'StudentController@index');
$router->get('/user', 'UserController@index');
$router->post('/login', 'UserController@login');


$router->post('/createCourse', 'CourseController@create');

$router->put('/editSubject', 'SubjectController@edit');

$router->put('/editGrade', 'GradesController@edit');
$router->post('/grades/upload', 'GradesController@upload');
$router->get('/grades/{id}/{section}', 'GradesController@show');
$router->get('/grades/{courseId}', 'GradesController@findSectionByCourseId');

$router->get('/api', function () {
    try {
        DB::connection()->getPdo();
        echo "Connection successful!";
    } catch (\Exception $e) {
        die("Could not connect to the database. Error: " . $e);
    }
});

