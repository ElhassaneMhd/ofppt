<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Demande>
 */
class EventFactory extends Factory
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
            'location' => $this->faker->city,
            'duration' => $this->faker->randomNumber(1),
            'details' => $this->faker->paragraph,
            'upcoming' => $this->faker->randomElement(['true', 'false']),
            'visibility' => $this->faker->randomElement(['true', 'false']),
            'tags' => $this->faker->word,
            'year_id' => random_int(7,14),
        ];
    }
}
