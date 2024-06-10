<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Demande>
 */
class FiliereFactory extends Factory
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
            'details' => $this->faker->paragraph,
            'isActive' => $this->faker->boolean,
            'visibility' => $this->faker->randomElement(['true', 'false']),
            'max_stagiaires' => $this->faker->randomNumber(2),
            'tags' => $this->faker->word,
            'year_id' => 2,
            'sector' => $this->faker->word,
        ];
    }
}
