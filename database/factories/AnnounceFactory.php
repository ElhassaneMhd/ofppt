<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announce>
 */
class AnnounceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => $this->faker->sentence,
            'startDate' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'endDate' => $this->faker->dateTimeBetween('now', '+1 month'),
            'visibility' => $this->faker->randomElement(['true', 'false']),
        ];
    }
}
