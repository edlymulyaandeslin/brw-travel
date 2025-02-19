<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('travel_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->constrained("destinations");
            $table->foreignId('category_id')->constrained("categories");
            $table->foreignId('car_id')->constrained("cars");
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->float('price');
            $table->integer('duration_days');
            $table->integer('capacity');
            $table->integer('available_capacity');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('driver');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travel_packages');
    }
};