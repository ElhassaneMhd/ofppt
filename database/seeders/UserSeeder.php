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
        $profile->firstName = 'Abdo';
        $profile->lastName = 'Halim';
        $profile->email = 'abdo.Halim@gmail.com';
        $profile->password = Hash::make('abdo123');
        $profile->phone = '0677552200';
        $profile->assignRole('super-admin');
        $profile->save();

        $profile = new User;
        $profile->firstName = 'Admin';
        $profile->lastName = 'admin';
        $profile->email = 'admi11n@gmail.com';
        $profile->password = Hash::make('hassan123');
        $profile->phone = '0677577200';
        $profile->assignRole('admin');
        $profile->save();

        $profile = new User;
        $profile->firstName = 'gest';
        $profile->lastName = 'gest';
        $profile->email = 'gest@gmail.com';
        $profile->password = Hash::make('hassan123');
        $profile->phone = '0677500200';
        $profile->assignRole('gestionaire');
        $profile->save();
    }
}
