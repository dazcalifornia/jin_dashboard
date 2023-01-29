<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

$router->get('/', function () use ($router) {
    return view('index',['name'=>'FRANX']);
});


$router->get('/grades', function (Request $request) {
    $results = DB::select("SELECT * FROM Grades", [1]);
    if(empty($results)){
        return response()->json(['message' => 'NODATA']);
    }
    return response()->json($results);
});

$router->get('/course', function (Request $request) {
    $results = DB::select("SELECT * FROM course");
    if(empty($results)){
        return response()->json(['data' => 'empty']);
    }
    return response()->json($results);
});

$router->get('/grades/{id}', function (Request $request, $id) {
    $results = DB::select("SELECT * FROM Grades WHERE (courseId = ?)", [$id]);
    if(empty($results)){
        return response()->json(['data' => 'empty']);
    }
    return response()->json($results);
});

$router->get('/std', function (Request $request) {
    $results = DB::select("SELECT * FROM Students", [1]);
    if(empty($results)){
        return response()->json(['data' => 'empty']);
    }
    return response()->json($results);
});
$router->get('/user', function (Request $request) {
    $results = DB::select("SELECT * FROM Users", [1]);
    if(empty($results)){
        return response()->json(['data' => 'empty']);
    }
    return response()->json($results);
});
