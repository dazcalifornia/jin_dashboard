<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table = 'course';
    protected $primaryKey = 'course_id';
    protected $fillable = [
        'course_id', 'course_name', 'credit','updated_at'
    ];

    public $timestamps = false;
}

