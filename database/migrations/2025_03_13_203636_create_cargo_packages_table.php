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
        Schema::create('cargo_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->constrained("destinations");
            $table->foreignId('category_id')->constrained("categories");
            $table->foreignId('car_id')->constrained("cars");
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->float('price');
            $table->float('additional_price');
            $table->integer('capacity_gram');
            $table->integer('max_capacity_gram');
            $table->date('departure_date');
            $table->string('driver');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargo_packages');
    }
};