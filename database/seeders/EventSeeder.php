<?php

namespace Database\Seeders;

use App\Models\Announce;
use App\Models\Event;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Faker $faker): void{
        Event::factory()->count(10)->create();
        Announce::factory()->count(10)->create();
    }
}
