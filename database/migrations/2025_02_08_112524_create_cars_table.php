<?php

use App\Models\Car;
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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string("name");          // Nama mobil
            $table->string("merk");          // Merek mobil
            $table->string("tahun");         // Tahun pembuatan
            $table->string("color");         // Warna mobil
            $table->enum("transmission", [
                Car::MANUAL,
                Car::AUTOMATIC,
            ]);  // Tipe transmisi (misal: Manual, Automatic)
            $table->string("fuel_type");     // Jenis bahan bakar (misal: Bensin, Diesel, Listrik)
            $table->integer("seat_count");   // Jumlah kursi
            $table->integer("jarak_tempuh");      // Jarak tempuh (kilometer)
            $table->string("plate_number")->unique(); // Nomor plat mobil (unik)
            $table->string("image")->nullable(); // Gambar mobil
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};