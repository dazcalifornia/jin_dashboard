<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function index()
    {
        $results = DB::select('SELECT * FROM course');

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
  }
  public function store(Request $request)
{
    $validatedData = $request->validate([
        'course_id' => 'required|unique:course',
        'course_name' => 'required',
        'section' => 'required',
        'credit' => 'required|numeric'
    ]);

    $course = Course::create($validatedData);

    return response()->json([
        'message' => 'Course created successfully',
        'data' => $course
    ])->header('Access-Control-Allow-Origin', '*')
    ->header('Access-Control-Allow-Methods', 'POST')
    ->header('Access-Control-Allow-Headers', 'Content-Type');
}

}

