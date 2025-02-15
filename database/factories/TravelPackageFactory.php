<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TravelPackage>
 */
class TravelPackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence();
        $capacity = $this->faker->numberBetween(5, 20);

        return [
            'destination_id' => mt_rand(1, 5),
            'category_id' => mt_rand(1, 3),
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->numberBetween(100000, 500000),
            'duration_days' => $this->faker->numberBetween(1, 10),
            'capacity' => $capacity,
            'available_capacity' => $capacity,
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'agent' => $this->faker->name(),
        ];
    }
}