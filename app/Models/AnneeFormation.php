<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnneeFormation extends Model
{
    use HasFactory;
      public function articles(){
    return $this->hasMany(Article::class,'annee_formation_id');
  }
      public function evenements(){
    return $this->hasMany(Evenement::class,'annee_formation_id');
  }
      public function filiers(){
    return $this->hasMany(Filier::class,'annee_formation_id');
  }
   public function scopeActive($query)
    {
        return $query->where('active', 1);
    }
}
