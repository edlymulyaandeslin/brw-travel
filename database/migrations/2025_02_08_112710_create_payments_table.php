<?php

use App\Models\Payment;
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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->unique()->constrained("bookings")->cascadeOnDelete();
            $table->float("dp");
            $table->float("amount");
            $table->enum("payment_method", [
                Payment::CASH,
                Payment::TRANSFER,
            ]);
            $table->string("bukti_bayar")->nullable();
            $table->enum("status", [
                Payment::DP,
                Payment::PAID,
                Payment::UNPAID,
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};