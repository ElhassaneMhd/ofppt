<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = ['user_id', 'status', 'browser', 'device', 'ip', 'location'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function activities()
    {
        return $this->hasMany(Activitie::class);
    }
}
