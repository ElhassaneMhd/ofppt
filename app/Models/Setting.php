<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    protected $fillable = [
        "email",
        "phone",
        'facebook',
        'instagram',
        'twitter',
        "youtube",
        'linkedin',
        'maps',
        'location',
        'AboutDescription',
        'announcementBanner'
    ];
    public function files() {
 	    return $this->morphMany(File::class, 'fileable');
	}
}
