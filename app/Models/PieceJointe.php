<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PieceJointe extends Model
{
    protected $fillable=['imageable_id','imageable_type','nom','URL','taille','emplacement'];
    use HasFactory;
    public function PieceJointeable() { 
		return $this->morphTo(); 
	}
}
