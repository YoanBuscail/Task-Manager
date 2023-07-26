<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // protected $table = 'tasks';
    // laravel cherche tout seul une table dans la BDD qui correspond à Task : il met avec minuscule + pluriel

    protected $fillable = ['title', 'category_id', 'status', 'created_at', 'updated_at'];
    // pour pouvoir utiliser create dans TaskController

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class);
    }
}
