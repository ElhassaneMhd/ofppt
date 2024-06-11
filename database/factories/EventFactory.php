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
            'status' => $this->faker->randomElement(['upcoming', 'deja']),
            'visibility' => $this->faker->randomElement(['true', 'false']),
            'tags' => $this->faker->word,
            'year_id' => 1,
        ];
    }
}
