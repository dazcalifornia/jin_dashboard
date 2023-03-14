<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return response()->json([
        'message' => 'This should be work fine ',
    ]);
});



Route::get('/api', function () {
    try {
        DB::connection()->getPdo();
        echo "Connection successful!";
    } catch (\Exception $e) {
        die("Could not connect to the database. Error: " . $e);
    }
});

$router->get('/grades', function () use ($router) {
    $results = app('db')->select('SELECT * FROM Grades');

    if (empty($results)) {
        return response()->json(['message' => 'NODATA']);
    } else {
        return response()->json($results);
    }
});

$router->get('/course', function () use ($router) {
    $results = app('db')->select('SELECT * FROM course');

    if (empty($results)) {
        return response()->json(['data' => 'empty'])
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET')
            ->header('Access-Control-Allow-Headers', 'Content-Type');
    } else {
        return response()->json($results)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET')
            ->header('Access-Control-Allow-Headers', 'Content-Type');
    }
});

$router->get('/std', function () use ($router) {
    $results = app('db')->select('SELECT * FROM Students');

    if (empty($results)) {
        return response()->json(['data' => 'empty']);
    } else {
        return response()->json($results);
    }
});

$router->get('/user', function () use ($router) {
    $results = app('db')->select('SELECT * FROM Users');

    if (empty($results)) {
        return response()->json(['data' => 'empty']);
    } else {
        return response()->json($results);
    }
});



$router->post('/submit', function () use ($router) {
    try {
        // Get the JSON data from the request body
        $json = file_get_contents('php://input');

        // Decode the JSON data into a PHP associative array
        $data = json_decode($json, true);
        $insertData = array();
        foreach ($data['name'] as $key => $value) {
            $name = $value['name'];
            $email = $value['email'];
            $age = $value['age'];
            $street = $value['street'];
            $city = $value['city'];
            $state = $value['state'];
            $zip = $value['zip'];
            
            $insertData[] = [
                'name' => $name,
                'email' => $email,
                'age' => $age,
                'street' => $street,
                'city' => $city,
                'state' => $state,
                'zip' => $zip
            ];
        }

        // Insert the data into the database
        $insert = app('db')->table('uploadfoo')->insert($insertData);

        // Return a success response with headers
        return response()
            ->json(['message' => 'Data inserted successfully', 'data' => $data])
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    } catch (\Exception $e) {
        // Log the error message
        error_log($e->getMessage());

        // Return a 500 error response
        return response()
            ->json(['error' => 'Internal server error'])
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->setStatusCode(500);
    }
});


$router->group(['prefix' => 'api'], function () use ($router) {

    $router->get('authors', ['uses' => 'AuthorController@showAllAuthors']);

    $router->get('authors/{id}', ['uses' => 'AuthorController@showOneAuthor']);

    $router->post('authors', ['uses' => 'AuthorController@create']);

    $router->delete('authors/{id}', ['uses' => 'AuthorController@delete']);

    $router->put('authors/{id}', ['uses' => 'AuthorController@update']);
});
