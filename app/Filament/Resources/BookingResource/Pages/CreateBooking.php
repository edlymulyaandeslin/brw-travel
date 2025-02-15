<?php

namespace App\Filament\Resources\BookingResource\Pages;

use Filament\Actions;
use App\Models\TravelPackage;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use App\Filament\Resources\BookingResource;
use Illuminate\Validation\ValidationException;

class CreateBooking extends CreateRecord
{
    protected static string $resource = BookingResource::class;

    protected function beforeCreate(): void
    {
        // Mengambil data dari form
        $data = $this->data;

        // Pastikan data 'passenger_count' dan 'travel_package_id' ada
        $passengerCount = $data['passenger_count'] ?? 0;
        $travelPackageId = $data['travel_package_id'] ?? null;
        $date = $data['booking_date'] ?? null;
        $dateNow = now()->subDay();

        if ($date <= $dateNow) {
            Notification::make()
                ->title('Invalid Date')
                ->body('Maaf, tanggal booking tidak boleh kurang dari hari ini.')
                ->danger()
                ->send();

            throw ValidationException::withMessages([
                'booking_date' => 'Tanggal booking tidak boleh kurang dari hari ini.'
            ]);
        }


        if ($travelPackageId) {
            // Dapatkan travel package
            $travelPackage = TravelPackage::find($travelPackageId);

            if ($travelPackage) {
                // Cek apakah kapasitas tersedia
                if ($travelPackage->available_capacity < $passengerCount) {
                    // Kirim notifikasi jika kuota habis
                    Notification::make()
                        ->title('Kuota Habis')
                        ->body('Maaf, kuota untuk paket perjalanan ini tidak mencukupi. sisa ' . $travelPackage->available_capacity . " kuota")
                        ->danger()
                        ->send();

                    // Batalkan proses pembuatan data
                    throw ValidationException::withMessages([
                        'passenger_count' => 'Kuota tidak mencukupi untuk jumlah penumpang yang dipilih.',
                    ]);
                }
            }
        }
    }

    protected function afterCreate(): void
    {
        // Mendapatkan record yang baru saja dibuat
        $booking = $this->record;

        // Akses data field yang ada di form
        $passengerCount = $booking->passenger_count;

        // Lakukan logika lebih lanjut, misalnya update atau proses lain
        $travelPackage = $booking->travelPackage; // Ini bisa mengakses relasi jika ada

        $travelPackage->available_capacity -= $passengerCount;
        $travelPackage->save();
    }
}