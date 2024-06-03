<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    public function run(): void
    {
        $profile = new User;
        $profile->firstName = 'Bahae';
        $profile->lastName = 'Halim';
        $profile->email = 'Bahae.Halim@gmail.com';
        $profile->password = Hash::make('Bahae123');
        $profile->phone = '0677552200';
        $profile->assignRole('super-admin');
        $profile->save();
 
    }
}
