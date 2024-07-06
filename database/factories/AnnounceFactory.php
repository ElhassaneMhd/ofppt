<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class AnnounceFactory extends Factory
{

    public function definition(): array
    {

        $styles = [
            'backgroundColor' => $this->faker->hexColor,
            'borderRadius' => $this->faker->randomElement([0, 5, 10, 15, 20, 25, 30, 35, 40]),
            'borderWidth' => $this->faker->randomElement([0, 1, 2, 3]),
            'borderColor' => $this->faker->hexColor,
            'borderStyle' => $this->faker->randomElement(['solid', 'dotted', 'dashed', 'none']),
            'paddingTop' => 15,
            'paddingRight' => 15,
            'paddingBottom' => 15,
            'paddingLeft' => 15,
        ];

        return [
            'content' => $this->faker->sentence,
            'startDate' => $this->faker->dateTimeBetween('-2 month', 'now'),
            'endDate' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'visibility' => $this->faker->randomElement(['true', 'false']),
            'styles' => json_encode($styles),

        ];
    }
}
