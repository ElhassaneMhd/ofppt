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
    protected $fillable=["title","details",'isActive',"maxStg",'visibility','sector'];
    public function files() {
 	    return $this->morphMany(File::class, 'Fileable');
	}
    public function year(){
        return $this->belongsTo(Year::class,'year_id');
    }
    public function user(){
        return $this->belongsTo(User::class);
    }

}
