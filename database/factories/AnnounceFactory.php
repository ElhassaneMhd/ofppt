<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class AnnounceFactory extends Factory
{

    public function definition(): array
    {
        return [
            'content' => $this->faker->sentence,
            'startDate' => $this->faker->dateTimeBetween('-2 month', 'now'),
            'endDate' => $this->faker->dateTimeBetween('-1 month','now'),
            'visibility' => $this->faker->randomElement(['true', 'false']),
        ];
    }
}
