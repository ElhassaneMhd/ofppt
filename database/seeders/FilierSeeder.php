<?php

namespace Database\Seeders;

use App\Models\Filier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class FilierSeeder extends Seeder
{

    public function run(Faker $faker)
    {
        Filier::factory()->count(20)->create();
    }
}

