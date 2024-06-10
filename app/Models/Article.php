<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
  use SoftDeletes, HasFactory;
  protected $fillable=["title","details",'date','tags','categorie','visibility','year_id','user_id'];

  public function files() {
      return $this->morphMany(File::class, 'fileable');
  }
  public function year(){
    return $this->belongsTo(Year::class);
  }
  public function user(){
      return $this->belongsTo(User::class);
  }
}
