<?php

namespace Database\Seeders;

use App\Models\Filiere;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class FiliereSeeder extends Seeder
{

    public function run(Faker $faker)
    {
        Filiere::factory()->count(10)->create();
    }
}

