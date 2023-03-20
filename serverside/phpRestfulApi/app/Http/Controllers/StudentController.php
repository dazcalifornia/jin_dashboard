<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function index()
    {
        $results = DB::select('SELECT * FROM Students');

        if (empty($results)) {
            return response()->json(['data' => 'empty']);
        } else {
            return response()->json($results);
        }
    }
}

