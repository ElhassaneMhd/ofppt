<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use DB;
class Filiere extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable=["title","details",'isActive',"max_stagiaires",'visibility','sector','year_id','user_id','tags'];
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
