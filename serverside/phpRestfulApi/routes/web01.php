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





$app->post('/login', function(Request $request) use ($app) {
    $email = $request->input('email');
    $password = $request->input('password');

    $user = User::where('email', $email)->where('password', $password)->first();

    if ($user) {
        return response()->json([
            'success' => true,
            'message' => 'Login successful.'
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Incorrect email or password.'
        ]);
    }
});

$app->put('/editsubJect', function(Request $request) use ($app) {
    $courseId = $request->input('data1');
    $courseName = $request->input('data2');
    $credit = $request->input('data3');
    $origin = $request->input('origin');

    $course = Course::where('course_id', $origin)->first();
    if (!$course) {
        return response()->json([
            'error' => 'Data update failed: Course not found'
        ]);
    }

    $course->course_id = $courseId;
    $course->course_name = $courseName;
    $course->credit = $credit;
    $course->save();

    return response()->json([
        'message' => 'Data updated successfully'
    ]);
});
$app->put('/editGrade', function(Request $request) use ($app) {
    $grade = $request->input('grade');
    $owner = $request->input('owner');
    $subject = $request->input('subject');

    $sql = "UPDATE Grades SET score = '$grade' WHERE studentId = $owner AND courseId = $subject";

    $result = DB::update($sql);
    if ($result) {
        return response()->json([
            'message' => 'Data updated successfully'
        ]);
    } else {
        return response()->json([
            'error' => 'Data update failed'
        ]);
    }
});


