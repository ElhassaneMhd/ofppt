<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Faker $faker): void{
          DB::table('events')->insert([
            'title' => $faker->sentence,
            'date' => $faker->date,
            'location' => $faker->city,
            'duree' => $faker->numberBetween(1, 10),
            'details' => $faker->text,
            'tags' => $faker->word .','.$faker->word,
            'status' => $faker->randomElement(['active', 'inactive']),
            'visibility' => $faker->randomElement(['true', 'false']),
            'user_id' =>1,
            'year_id' => 1,
        ]);
    }
}
