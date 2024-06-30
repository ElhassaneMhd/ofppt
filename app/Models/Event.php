<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Observers\EventObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([EventObserver::class])]
class Event extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable=["title","details",'location','tags','duration','date','upcoming','visibility','year_id','user_id'];
    public function files() {
 	    return $this->morphMany(File::class, 'Fileable');
	}
    public function year(){
    return $this->belongsTo(Year::class);
  }
    public function user(){
    return $this->belongsTo(User::class);
  }

}
