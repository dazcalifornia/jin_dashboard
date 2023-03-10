<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



$router->get('/', function () use ($router) {
    return response()->json(['message' => 'Welcome to the API']);
});


$app->post('/login', function (Request $request) use ($app) {
    $email = $request->input('email');
    $password = $request->input('password');
    $query = "SELECT * FROM Users WHERE email = ? AND password = ?";
    $results = DB::select($query, [$email, $password]);
    if ($results) {
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

$app->put('/editsubJect', function (Request $request) use ($app) {
    $courseId = $request->input('data1');
    $courseName = $request->input('data2');
    $credit = $request->input('data3');
    $origin = $request->input('origin');
    $sql = "UPDATE course SET course_id = ?, course_name = ?, credit = ? WHERE course_id = ?";
    DB::update($sql, [$courseId, $courseName, $credit, $origin]);
    return response()->json(['message' => 'Data updated successfully']);
});

$app->put('/editGrade', function (Request $request) use ($app) {
    $grade = $request->input('grade');
    $owner = $request->input('owner');
    $subject = $request->input('subject');
    $sql = "UPDATE Grades SET score = ? WHERE studentId = ? AND courseId = ?";
    DB::update($sql, [$grade, $owner, $subject]);
    return response()->json(['message' => 'Data updated successfully']);
});

$app->get('/grades', function () use ($app) {
    $results = DB::select('SELECT * FROM Grades');
    if ($results) {
        return response()->json($results);
    } else {
        return response()->json(['message' => 'NODATA']);
    }
});

$app->get('/course', function () use ($app) {
    $results = DB::select('SELECT * FROM course');
    if ($results) {
        return response()->json($results);
    } else {
        return response()->json(['data' => 'empty']);
    }
});

$app->get('/std', function () use ($app) {
    $results = DB::select('SELECT * FROM Students');
    if ($results) {
        return response()->json($results);
    } else {
        return response()->json(['data' => 'empty']);
    }
});

$app->get('/grades/{id}', function ($id) use ($app) {
    $results = DB::select('SELECT * FROM Grades WHERE courseId = ?', [$id]);
    if ($results) {
        return response()->json($results);
    } else {
        return response()->json(['data' => 'empty']);
    }
});

$app->get('/user', function () use ($app) {
    $results = DB::select('SELECT * FROM Users');
    if ($results) {
        return response()->json($results);
    } else {
        return response()->json(['data' => 'empty']);
    }
