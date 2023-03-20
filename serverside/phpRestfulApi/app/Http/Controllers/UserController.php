<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        $results = DB::select('SELECT * FROM Users');

        if (empty($results)) {
            return response()->json(['data' => 'empty']);
        } else {
            return response()->json($results);
        }
    }

    
public function login(Request $request)
{
    $email = $request->input('email');
    $password = $request->input('password');

    $user = User::where('email', $email)->where('password', $password)->first();

    if ($user) {
        return response()->json([
            'success' => true,
            'message' => 'Login successful.'
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Incorrect email or password.'
        ]);
    }
}

}

