<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class image extends Model
{
    use HasFactory;
    protected $fillable=['imageable_id','imageable_type','nom','URL','taille','emplacement'];

     public function imageable() { 
		return $this->morphTo('imageable'); 
	}
}
