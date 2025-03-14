<?php

use App\Models\CargoBooking;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cargo_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained("users")->cascadeOnDelete();
            $table->foreignId('cargo_package_id')->constrained("cargo_packages");
            $table->string("product_name");
            $table->integer("size");
            $table->string("sender");
            $table->text("sender_address");
            $table->string("recipient");
            $table->text("recipient_address");
            $table->date("delivery_date");
            $table->text("notes")->nullable();
            $table->float("amount");
            $table->enum("status", [
                CargoBooking::PENDING,
                CargoBooking::CONFIRMED,
                CargoBooking::COMPLETED,
                CargoBooking::CANCELLED,
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargo_bookings');
    }
};