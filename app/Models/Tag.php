<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable=['name'];
    use HasFactory;
    public function articles() {
	      return $this->morphedByMany(Article::class, 'taggable');
 	}
    public function filiers() {
	      return $this->morphedByMany(Filier::class, 'taggable');
 	}
    public function evenements() {
	      return $this->morphedByMany(Evenement::class, 'taggable');
 	}

}
