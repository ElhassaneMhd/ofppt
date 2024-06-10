<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    use HasFactory;
      public function articles(){
    return $this->hasMany(Article::class);
  }
      public function events(){
    return $this->hasMany(Event::class);
  }
      public function filieres(){
    return $this->hasMany(Filiere::class);
  }
   public function scopeActive($query)
    {
        return $query->where('isActive', 1);
    }
}
