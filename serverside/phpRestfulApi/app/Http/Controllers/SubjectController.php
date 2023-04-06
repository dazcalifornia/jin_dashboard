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
    
    $course = Course::where('course_id', $origin)->first();
    if (!$course) {
        return response()->json([
            'error' => 'Data update failed: Course not found'
        ]);
    }

    $oldCourseId = $course->course_id;
    $oldCourseName = $course->course_name;

    $course->course_id = $courseId;
    $course->course_name = $courseName;
    $course->credit = $credit;
    $course->save();

    // Update grades table
    DB::table('Grades')
        ->where('courseId', $oldCourseId)
        ->where('Course_name', $oldCourseName)
        ->update([
            'courseId' => $courseId,
            'Course_name' => $courseName,
            'Section' => $course->section,
            'credit' => $credit,
            'updated_at' => Carbon::now(),
        ]);

    return response()->json([
        'message' => 'Data updated successfully'
    ]);
}}
