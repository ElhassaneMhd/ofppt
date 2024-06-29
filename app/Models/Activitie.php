<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activitie extends Model
{
    use HasFactory;
    protected $fillable = ['session_id', 'model', 'action', 'object', 'activity'];
    public function session()
    {
        return $this->belongsTo(Session::class);
    }


}
