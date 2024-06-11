<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
class ArticleSeeder extends Seeder
{
    public function run(Faker $faker): void{
        Article::factory()->count(5)->create();
      }
}
