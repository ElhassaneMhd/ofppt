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
       // Filiere::factory()->count(10)->create();
        $filieres=  [
    [
        'title' => 'Web Development',
        'details' => 'Learn the basics of web development, including HTML, CSS, and JavaScript.',
        'isActive' => true,
        'visibility' => false,
        'max_stagiaires' => 30,
        'tags' => 'web,development,html,css,javascript',
        'year_id' => 9,
        'sector' => 'Technology',
            ],
            [
                'title' => 'Digital Marketing Fundamentals',
                'details' => 'Explore the essentials of digital marketing strategies and tools.',
                'isActive' => true,
                'visibility' => true,
                'max_stagiaires' => 25,
                'tags' => 'digital marketing',
                'year_id' => 8,
                'sector' => 'Marketing',
            ],
            [
                'title' => 'Introduction to Data Science',
                'details' => 'An introductory course to data science and its applications.',
                'isActive' => true,
                'visibility' => true,
                'max_stagiaires' => 20,
                'tags' => 'data science',
                'year_id' => 7,
                'sector' => 'Data Science',
            ],
            [
                'title' => 'Graphic Design Essentials',
                'details' => 'Learn the fundamentals of graphic design, including Adobe Illustrator and Photoshop.',
                'isActive' => false,
                'visibility' => true,
                'max_stagiaires' => 15,
                'tags' => 'graphic design',
                'year_id' => 14,
                'sector' => 'Design',
            ],
            [
                'title' => 'Project Management Basics',
                'details' => 'Basic principles of project management and tools like Trello and Asana.',
                'isActive' => true,
                'visibility' => true,
                'max_stagiaires' => 18,
                'tags' => 'project management',
                'year_id' => 11,
                'sector' => 'Management',
            ],
        ];
        DB::table('filieres')->insert($filieres);
    }
}

