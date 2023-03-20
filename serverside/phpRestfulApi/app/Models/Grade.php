<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
  protected $table = 'Grades';
  protected $primaryKey = 'id';
    protected $fillable = [
        'studentId', 'courseId', 'score'
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'studentId');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'courseId');
    }
}
