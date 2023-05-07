<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class StudentController extends Controller
{
    public function index()
    {
        $students = DB::table('Students')->get();
        return response()->json($students);
    }

    public function create(Request $request)
    {
        $data = $request->json()->all();
        if (empty($data)) {
            return response()->json([
                'success' => false,
                'message' => 'Student data is required.'
            ]);
        }
        foreach ($data as $item) {
            foreach ($item['data'] as $row) {
                DB::table('Students')->insert([
                    'Id' => $row['stdId'],
                    'name' => $row['name'],
                    'Major' => $row['Major'],
                    'gender' => $row['gender'],
                    'GPA' => $row['GPA'],
                    'Tcas' => $row['Tcas'],
                    'School' => $row['School'],
                    'provice' => $row['provice'], // Fix the key name here
                    'grade' => $row['grade']
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Student data has been added successfully.'
        ]);

    }
}
