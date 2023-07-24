<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // protected $table = 'tasks';
    // laravel cherche tout seul une table dans la BDD qui correspond à Task : il met avec minuscule + pluriel

    protected $fillable = ['title', 'status', 'created_at', 'updated_at'];
    // pour pouvoir utiliser create dnas TaskController
}
