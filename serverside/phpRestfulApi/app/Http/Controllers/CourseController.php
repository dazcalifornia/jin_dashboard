<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Models\Course;


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

public function create(Request $request)
{
        $this->validate($request, [
            'course_id' => 'required|numeric',
            'course_name' => 'required|string',
            'section' => 'required|string',
            'credit' => 'required|numeric',
        ]);

        DB::table('course')->insert([
            'course_id' => $request->input('course_id'),
            'course_name' => $request->input('course_name'),
            'section' => $request->input('section'),
            'credit' => $request->input('credit'),
        ]);

        return response()->json(['message' => 'Course added successfully'])
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'POST')
            ->header('Access-Control-Allow-Headers', 'Content-Type');
    }
}

