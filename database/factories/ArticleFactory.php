<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Demande>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
          return [
            'title' => $this->faker->sentence,
            'date' => $this->faker->date,
            'details' => $this->faker->paragraph,
            'visibility' => $this->faker->randomElement(['true', 'false']),
            'categorie' => $this->faker->word,
            'tags' => $this->faker->word,
            'user_id' =>1,
            'year_id' => random_int(7,14),
        ];
    }
}
