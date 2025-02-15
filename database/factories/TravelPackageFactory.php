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

        $dateNow = now();
        // Generate startDate: antara 1 hingga 14 hari dari sekarang
        $startDate = $dateNow->copy()->addDays(rand(1, 14));

        // Generate endDate: antara 1 hingga 7 hari setelah startDate
        $endDate = $startDate->copy()->addDays(rand(1, 7));

        $durationDays = (int) $startDate->diffInDays($endDate);

        return [
            'destination_id' => mt_rand(1, 5),
            'category_id' => mt_rand(1, 3),
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraph(4),
            'price' => $this->faker->numberBetween(100000, 500000),
            'duration_days' => $durationDays,
            'capacity' => $capacity,
            'available_capacity' => $capacity,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'agent' => $this->faker->name(),
        ];
    }
}