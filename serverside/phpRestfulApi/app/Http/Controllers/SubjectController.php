<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Course;

class SubjectController extends Controller
{
    public function edit(Request $request)
    {
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
    }
}

