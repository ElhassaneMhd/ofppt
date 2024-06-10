<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class YearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($year = 2010; $year <= 2040; $year++) {
        if ($year+1===getdate()['year']){$active='true';}
            else {$active='false';}
            $academicYearStart = $year . '-09-01';
            $academicYearEnd = ($year + 1) . '-07-31';
            $data = [
            'year' => $year . '/' . ($year + 1),
            'startDate' => $academicYearStart,
            'endDate' => $academicYearEnd,
            'isActive' =>  $active,  // or false depending on your logic
            'inscriptionStartDate' => $academicYearStart,
            'inscriptionEndDate' => $academicYearEnd,
            'inscriptionStatus' => false,  // or false depending on your logic
            'created_at' => now(),
            'updated_at' => now(),
        ];
        DB::table('years')->insert($data);
    }
    }
}
