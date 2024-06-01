<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use DB;
class Filier extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable=["titre","details",'Active',"Max_Stagiaires",'image',];
    public function pieceJointes() {
 	    return $this->morphMany(PieceJointe::class, 'PieceJointeable'); 
	}
    public function tags() {
 	    return $this->morphMany(Tag::class, 'taggable'); 
	}
     public function AnneeFormations(){
    return $this->belongsTo(AnneeFormation::class,'annee_formation_id');
  }
      public function Admin(){
    return $this->belongsTo(User::class,'user_id');
  }
      public function Secteur(){
    return $this->belongsTo(Secteur::class,'secteur_id');
  }
}
