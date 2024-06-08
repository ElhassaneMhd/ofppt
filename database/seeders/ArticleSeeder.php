<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Faker $faker): void
    {
      DB::table('articles')->insert([
            'title' => $faker->sentence,
            'date' => $faker->date,
            'details' => $faker->text,
            'visibility' => $faker->randomElement(['true', 'false']),
            'categorie' => $faker->word,
            'tags' => $faker->word .','.$faker->word,
            'user_id' =>1,
            'year_id' =>1,
            'deleted_at' => $faker->randomElement([null, $faker->dateTime]),
            'created_at' => $faker->dateTime,
            'updated_at' => $faker->dateTime,
        ]);  
      }
}
