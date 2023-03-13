<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

use App\Models\User;
class Controller extends BaseController
{
  //will get data in here and return it to the view
  public function index() {
    try{
      $TestDB = DB::connection('sqlsrv')->getDatabaseName();
      return response()->json([
        'message' => 'This should be work fine ',
        'TestDB' => $TestDB
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'This should be work fine ',
        'TestDB' => $e->getMessage()
      ]);

    }
  } 

}

