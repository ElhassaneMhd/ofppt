<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    use HasFactory, Notifiable,SoftDeletes,HasRoles,HasApiTokens;
    protected $fillable = [
        'firstName',
        'lastName',
        'phone',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function articles(){
     return $this->hasMany(Article::class);
    }
    public function filieres(){
        return $this->hasMany(Filiere::class);
    }
    public function events(){
        return $this->hasMany(Event::class);
    }
    public function files() {
 	    return $this->morphMany(File::class, 'fileable');
	}
}
