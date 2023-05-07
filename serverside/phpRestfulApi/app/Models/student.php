<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'students';
    protected $primaryKey = 'Id';
    protected $fillable = [
        'Id', 'name', 'Major', 'gender', 'GPA', 'Tcas', 'School', 'provice', 'grade'
    ];

    public $timestamps = false;
}
