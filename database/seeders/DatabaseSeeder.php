<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesAndPermissionsSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(YearSeeder::class);
        $this->call(ArticleSeeder::class);
        $this->call(FiliereSeeder::class);
        $this->call(EventSeeder::class);
        $this->call(DemandSeeder::class);
    }
}
