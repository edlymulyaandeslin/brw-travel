<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\TravelPackage;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TravelPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            $title = "Travel Package " . $i;
            TravelPackage::factory()->create([
                "title" => $title,
                "slug" => Str::slug($title)
            ]);
        }
    }
}