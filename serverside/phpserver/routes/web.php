<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

$app->group(['prefix' => 'api'], function () use ($app) {

    $app->post('/uploader', function (Request $request) use ($app) {
        $filePath = public_path('uploads/' . $request->file('file')->getClientOriginalName());
        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
        $spreadsheet = $reader->load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();
        $rows = $worksheet->toArray();

        foreach ($rows as $row) {
            $values = [
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                $row[4]
            ];

            DB::insert('INSERT INTO Grades (studentId, Std_name, courseId, Course_name, score) VALUES (?, ?, ?, ?, ?)', $values);
        }

        return response()->json(['message' => 'File uploaded and data inserted into the database']);
    });

    $app->post('/api/convert-excel-to-json', function (Request $request) use ($app) {
        $filePath = $request->input('file');
        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
        $spreadsheet = $reader->load($filePath);
        $worksheet = $spreadsheet->getActiveSheet();
        $data = $worksheet->toArray();

        return response()->json($data);
    });

    $app->post('/login', function (Request $request) use ($app) {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = DB::selectOne("SELECT * FROM Users WHERE email = ? AND password = ?", [$email, $password]);

        if ($user) {
            return response()->json(['success' => true, 'message' => 'Login successful.']);
        } else {
            return response()->json(['success' => false, 'message' => 'Incorrect email or password.']);
        }
    });

    $app->put('/editsubJect', function (Request $request) use ($app) {
        $courseId = $request->input('data1');
        $courseName = $request->input('data2');
        $credit = $request->input('data3');
        $origin = $request->input('origin');

        $result = DB::update("UPDATE course SET course_id = ?, course_name = ?, credit = ? WHERE course_id = ?", [$courseId, $courseName, $credit, $origin]);

        if ($result) {
            return response()->json(['message' => 'Data updated successfully']);
        } else {
            return response()->json(['error' => 'Data update failed']);
        }
    });

    $app->put('/editGrade', function (Request $request) use ($app) {
        $grade = $request->input('grade');
        $owner = $request->input('owner');
        $subject = $request->input('subject');

        $result = DB::update("UPDATE Grades SET score = ? WHERE studentId = ? AND courseId = ?", [$grade, $owner, $subject]);

        if ($result) {
            return response()->json(['message' => 'Data updated successfully']);
} else {
return response()->json(['error' => 'Data update failed']);
}
});
$app->get('/students', function () use ($app) {
    $students = DB::select('SELECT * FROM Students');
    return response()->json($students);
});

$app->get('/courses', function () use ($app) {
    $courses = DB::select('SELECT * FROM course');
    return response()->json($courses);
});

$app->get('/grades', function () use ($app) {
    $grades = DB::select('SELECT * FROM Grades');
    return response()->json($grades);
});

});

?>

