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
            'isActive' => $this->faker->randomElement(['true', 'false']),
            'visibility' => $this->faker->randomElement(['true', 'false']),
            'max_stagiaires' => $this->faker->randomNumber(2),
            'tags' => $this->faker->word,
            'year_id' =>random_int(7,14),
            'sector' => $this->faker->word,
        ];
    }
}
