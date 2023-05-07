<?php
namespace App\Http\Controllers;
use App\Models\Grade;
use App\Models\Course;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


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
  public function show($id,$section)
    {
        $grades = Grade::where('courseId', $id)->where('Section',$section)->get();

        if ($grades->isEmpty()) {
            return response()->json(['data' => 'empty']);
        } else {
            return response()->json($grades);
        }
  }
  public function findSectionByCourseId($courseId)
{
    $grades = Grade::where('courseId', $courseId)->select('Section')->distinct()->get();

    if ($grades->isEmpty()) {
        return response()->json(['data' => 'empty']);
    } else {
        return response()->json($grades);
    }
}
   public function edit(Request $request)
    {
        $grade = $request->input('grade');
        $owner = $request->input('owner');
        $subject = $request->input('subject');
        $section = $request->input('section');

        $result = Grade::where('studentId', $owner)
        ->where('courseId', $subject)
        ->where('Section', $section)
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
   public function upload(Request $request)
{
    $data = $request->json()->all();
    if (empty($data)) {
        return response()->json(['message' => 'No data provided']);
    }
    foreach ($data as $item) {
        foreach ($item['data'] as $row) {
            // Check if the course already exists in the Courses table
            $course = Course::where('course_id', $row['courseID'])->first();
            if (!$course) {
                // If the course doesn't exist, insert it into the Courses table
                $course = new Course();
                $course->course_id = $row['courseID'];
                $course->course_name = $row['courseName'];
                $course->credit = $row['credit'];
                $course->updated_at = Carbon::now();
                $course->save();
            }
            // Insert the grade information into the Grades table with the corresponding courseId
            DB::table('Grades')->insert([
                'studentId' => $row['StudentId'],
                'Std_name' => $row['Name'],
                'Course_name' => $row['courseName'],
                'score' => $row['Score'],
                'courseId' => $row['courseID'],
                'Section' => $row['Section'],
                'credit' => $row['credit'],
                'updated_at' => Carbon::now(),
            ]);
        }
    }
    return response()->json(['message' => 'Data uploaded successfully']);
}}

