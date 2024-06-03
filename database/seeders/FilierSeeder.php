<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class FilierSeeder extends Seeder
{

    public function run(Faker $faker)
    {
        DB::table('filiers')->insert([
            'title' => $faker->sentence,
            'details' => $faker->text,
            'isActive' => $faker->boolean,
            'visibility' => $faker->randomElement(['true', 'false']),
            'maxStg' => $faker->numberBetween(1, 100),
            'user_id' => 1,
            'year_id' => 1,
            'secteur' => $faker->word,
        ]);
    }
}
    
