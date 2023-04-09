<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Course;
class SubjectController extends Controller
{
  
public function edit(Request $request)
{
    $courseId = $request->input('course_id');
    $courseName = $request->input('course_name');
    $credit = $request->input('credit');
    $origin = $request->input('updated_at');
    $sections = $request->input('sections');

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

    // Loop through each section and update the grades
    foreach ($sections as $section) {
        Grade::where('courseId', $courseId)
            ->where('Section', $section['Section'])
            ->update([
                'Course_name' => $courseName,
                'credit' => $credit
            ]);
    }

    return response()->json([
        'message' => 'Data updated successfully'
    ]);
}
}
