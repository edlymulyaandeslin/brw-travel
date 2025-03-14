<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use App\Models\CargoBooking;

class CargoLaporan extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static string $view = 'filament.pages.cargo-laporan';
    protected static ?string $navigationGroup = 'Laporan';
    protected static ?string $navigationLabel = 'Cargo Booking Report';

    protected function getViewData(): array
    {
        $query = CargoBooking::with(['user', 'cargoPackage']);

        // Ambil filter dari request
        $startDate = request('start_date');
        $endDate = request('end_date');

        if ($startDate && $endDate) {
            $query->whereBetween('delivery_date', [$startDate, $endDate]);
        }

        $reportData = $query->whereIn("status", ["Confirmed", "Completed"])->paginate(10)->withQueryString();

        return compact('reportData', 'startDate', 'endDate');
    }
}
