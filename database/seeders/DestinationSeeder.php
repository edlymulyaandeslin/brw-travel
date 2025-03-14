<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = ["Rohul Pekanbaru", "Rohul Sumbar", "Pulau One Piece", "Pulau Bintang", "Rohul Medan"];

        foreach ($names as $name) {
            Destination::factory()->create([
                "name" => $name,
                "slug" => Str::slug($name)
            ]);
        }
    }
}