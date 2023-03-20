<?php
namespace App\Http\Controllers;
use App\Models\Grade;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GradesController extends Controller
{
    public function index()
    {
        $results = DB::select('SELECT * FROM Grades');

        if (empty($results)) {
            return response()->json(['message' => 'NODATA']);
        } else {
            return response()->json($results);
        }
  }
   public function edit(Request $request)
    {
        $grade = $request->input('grade');
        $owner = $request->input('owner');
        $subject = $request->input('subject');

        $result = Grade::where('studentId', $owner)
            ->where('courseId', $subject)
            ->update(['score' => $grade]);

        if ($result) {
            return response()->json([
                'message' => 'Data updated successfully'
            ]);
        } else {
            return response()->json([
                'error' => 'Data update failed'
            ]);
        }
    }
}

