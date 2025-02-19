<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->name(),
            "merk" => fake()->name(),
            "tahun" => now()->year,
            "color" => fake()->colorName(),
            "transmission" =>  fake()->randomElement(['manual', 'automatic']),
            "fuel_type" =>  fake()->randomElement(['bensin', 'listrik', 'diesel']),
            "seat_count" =>  mt_rand(1, 5),
            "jarak_tempuh" =>  mt_rand(100, 1000),
            "plate_number" => fake()->bothify('##-####'),
        ];
    }
}