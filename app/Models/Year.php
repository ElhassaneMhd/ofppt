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
      public function evenements(){
    return $this->hasMany(Evenement::class);
  }
      public function filiers(){
    return $this->hasMany(Filier::class);
  }
   public function scopeActive($query)
    {
        return $query->where('isActive', 1);
    }
}
