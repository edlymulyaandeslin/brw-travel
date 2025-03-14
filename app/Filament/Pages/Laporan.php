<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Carbon\Carbon;
use App\Models\Booking;

class Laporan extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-document';
    protected static string $view = 'filament.pages.report';
    protected static ?string $navigationGroup = 'Laporan';
    protected static ?string $navigationLabel = 'Booking Report';

    protected function getViewData(): array
    {
        $query = Booking::with(['user', 'travelPackage', 'payment']);

        // Ambil filter dari request
        $startDate = request('start_date');
        $endDate = request('end_date');

        if ($startDate && $endDate) {
            $query->whereBetween('booking_date', [$startDate, $endDate]);
        }

        $reportData = $query->whereIn("status", ["Confirmed", "Completed"])->paginate(10)->withQueryString();

        return compact('reportData', 'startDate', 'endDate');
    }
}
