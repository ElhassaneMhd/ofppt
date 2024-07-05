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
            'title'=>$this->faker->sentence,
            'description'=>$this->faker->sentence,
            'startDate'=>$this->faker->date,
            'endDate'=>$this->faker->date,
            'visibility' => $this->faker->randomElement(['true', 'false']),
        ];
    }
}
